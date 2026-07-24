/* ============================================================
   assistant.js — Voice-first AI Campus Assistant
   Talks to the backend's Gemini-backed /api/assistant endpoint.
   Chat history is stored in the browser (localStorage) and kept
   deliberately separate from rendering, so it can later be swapped
   for a real backend (Firebase, a /api/conversations table, etc.)
   without touching the UI code — see saveConversations/loadConversations.
   ============================================================ */
(function(){

const STORAGE_KEY = 'compass_voice_history';
const SUGGESTIONS = [
 'When is the Hackathon?',
 'What clubs are in the Tech category?',
 'Where is the library?',
 'Who is the CSE HoD?'
];

/* ---------------- state ---------------- */
let conversations = loadConversations();
let currentConvId = null;
let currentLang = 'en';         // 'en' | 'ta'
let phase = 'ready';            // ready | listening | thinking | speaking
let recognition = null;
let voicesCache = [];
let speakingMsgId = null;

/* ---------------- dom refs (assigned in init) ---------------- */
let dom = {};

function cacheDom(){
 dom = {
  historyPanel: document.getElementById('vaHistoryPanel'),
  historyList: document.getElementById('vaHistoryList'),
  backdrop: document.getElementById('vaBackdrop'),
  openDrawer: document.getElementById('vaOpenDrawer'),
  closeDrawer: document.getElementById('vaCloseDrawer'),
  newChat: document.getElementById('vaNewChat'),
  deleteAll: document.getElementById('vaDeleteAll'),
  langChips: document.getElementById('vaLangChips'),
  statusPill: document.getElementById('vaStatusPill'),
  statusDot: document.querySelector('#vaStatusPill .va-status-dot'),
  statusText: document.getElementById('vaStatusText'),
  waveform: document.getElementById('vaWaveform'),
  messages: document.getElementById('vaMessages'),
  suggestions: document.getElementById('vaSuggestions'),
  micBtn: document.getElementById('vaMicBtn'),
  textInput: document.getElementById('vaTextInput'),
  sendBtn: document.getElementById('vaSendBtn'),
  geminiStatus: document.getElementById('geminiStatus')
 };
}

/* ============================================================
   STORAGE
   ============================================================ */
function loadConversations(){
 try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
 catch(e){ return []; }
}
function saveConversations(){
 try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations)); }
 catch(e){ console.error('Could not save chat history', e); }
}
function getCurrentConv(){ return conversations.find(c=>c.id===currentConvId) || null; }
function uid(){ return 'm_'+Date.now()+'_'+Math.random().toString(36).slice(2,7); }
function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

/* ============================================================
   DATE GROUPING
   ============================================================ */
function groupLabel(ts){
 const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
 const days = Math.floor((startOfDay(new Date()) - startOfDay(new Date(ts))) / 86400000);
 if(days <= 0) return 'Today';
 if(days === 1) return 'Yesterday';
 if(days <= 7) return 'Last Week';
 return 'Older';
}
function formatTime(ts){ return new Date(ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}); }

/* ============================================================
   HISTORY PANEL
   ============================================================ */
function renderHistory(){
 if(!dom.historyList) return;
 if(!conversations.length){
  dom.historyList.innerHTML = '<div class="va-history-empty">No conversations yet — say hello!</div>';
  return;
 }
 const order = ['Today','Yesterday','Last Week','Older'];
 const groups = {Today:[], Yesterday:[], 'Last Week':[], Older:[]};
 conversations.slice().sort((a,b)=>b.updatedAt-a.updatedAt).forEach(c=>groups[groupLabel(c.updatedAt)].push(c));
 let html = '';
 order.forEach(label=>{
  if(!groups[label].length) return;
  html += `<div class="va-history-group-label">${label}</div>`;
  groups[label].forEach(c=>{
   html += `<div class="va-history-item ${c.id===currentConvId?'active':''}" data-id="${c.id}">
     <button class="va-hist-delete" data-delete="${c.id}" aria-label="Delete conversation">🗑</button>
     <h4>${escapeHtml(c.title)}</h4>
     <div class="va-hist-meta"><span>${formatTime(c.updatedAt)}</span><span>${c.lang==='ta'?'தமிழ்':'EN'}</span><span>${c.messages.length} msgs</span></div>
   </div>`;
  });
 });
 dom.historyList.innerHTML = html;
}
function loadConversation(id){
 const conv = conversations.find(c=>c.id===id);
 if(!conv) return;
 stopSpeech();
 currentConvId = id;
 currentLang = conv.lang || 'en';
 updateLangChips();
 dom.messages.innerHTML = '';
 conv.messages.forEach(m=>appendMessageToDOM(m, false));
 requestAnimationFrame(()=>{ dom.messages.scrollTop = conv.scrollPos || dom.messages.scrollHeight; });
 renderHistory();
 closeDrawer();
 setPhase('ready');
}
function deleteConversation(id){
 conversations = conversations.filter(c=>c.id!==id);
 saveConversations();
 if(id===currentConvId){ currentConvId=null; startFreshView(); }
 renderHistory();
}
function deleteAllHistory(){
 if(!conversations.length) return;
 if(!window.confirm('Delete all conversation history? This cannot be undone.')) return;
 conversations = [];
 currentConvId = null;
 saveConversations();
 renderHistory();
 startFreshView();
}

/* ============================================================
   DRAWER (mobile)
   ============================================================ */
function openDrawerFn(){ dom.historyPanel.classList.add('open'); dom.backdrop.classList.add('open'); }
function closeDrawer(){ dom.historyPanel.classList.remove('open'); dom.backdrop.classList.remove('open'); }

/* ============================================================
   LANGUAGE
   ============================================================ */
function updateLangChips(){
 if(!dom.langChips) return;
 dom.langChips.querySelectorAll('.va-chip').forEach(btn=>btn.classList.toggle('active', btn.dataset.lang===currentLang));
}
function setLang(lang){
 currentLang = lang;
 updateLangChips();
 const conv = getCurrentConv();
 if(conv) conv.lang = lang; // future messages in this thread use the new language; past ones are untouched
 dom.textInput.placeholder = lang==='ta' ? 'தட்டச்சு செய்யவும், அல்லது மைக்கை அழுத்தவும்...' : 'Type, or tap the mic to speak...';
}

/* ============================================================
   STATUS / PHASE STATE MACHINE
   ready → listening → thinking → speaking → (completed) → ready
   ============================================================ */
function setPhase(next, label){
 phase = next;
 const labels = {
  ready: 'Ready', listening: 'Listening...', transcribing: 'Transcribing...',
  thinking: 'Thinking...', generating: 'Generating response...', speaking: 'Speaking...', completed: 'Completed'
 };
 dom.statusText.textContent = label || labels[next] || next;
 dom.statusDot.className = 'va-status-dot' + (next==='listening'||next==='speaking' ? ' speaking' : (next==='thinking'||next==='generating'||next==='transcribing' ? ' busy' : ''));
 dom.waveform.classList.toggle('active', next==='listening' || next==='speaking');

 // mic: disabled while genuinely working out a reply; re-enabled while speaking so the user can interrupt
 dom.micBtn.classList.toggle('disabled', next==='thinking' || next==='generating' || next==='transcribing');
 dom.micBtn.classList.toggle('listening', next==='listening');
 // send + text input: locked for the whole response cycle, exactly one in flight at a time
 const locked = (next!=='ready' && next!=='completed');
 dom.sendBtn.disabled = locked;
 dom.textInput.disabled = locked;
}

/* ============================================================
   MESSAGE RENDERING
   ============================================================ */
function appendMessageToDOM(msg, animate){
 const row = document.createElement('div');
 row.className = 'va-msg-row ' + msg.role;
 row.dataset.id = msg.id;
 if(animate!==false) row.style.animation = 'fadeUp .35s ease';

 let controls = '';
 if(msg.role==='bot'){
  controls = `<div class="va-msg-controls">
    <button data-play="${msg.id}" title="Play">▶</button>
    <button data-pause="${msg.id}" title="Pause">⏸</button>
    <button data-stop="${msg.id}" title="Stop">⏹</button>
  </div>`;
 }
 row.innerHTML = `<div class="va-msg">${escapeHtml(msg.text)}</div>${controls}`;
 dom.messages.appendChild(row);
 dom.messages.scrollTop = dom.messages.scrollHeight;
 return row;
}
function markRowSpeaking(msgId, on){
 dom.messages.querySelectorAll('.va-msg-row').forEach(r=>r.classList.remove('speaking'));
 if(on){
  const row = dom.messages.querySelector(`.va-msg-row[data-id="${msgId}"]`);
  if(row) row.classList.add('speaking');
 }
}

function startFreshView(){
 dom.messages.innerHTML = '';
 const greetText = currentLang==='ta'
  ? 'வணக்கம்! நான் உங்கள் வளாக உதவியாளர். நிகழ்வுகள், கழகங்கள், பேராசிரியர்கள் பற்றி கேளுங்கள் — தட்டச்சு செய்யவோ பேசவோ செய்யலாம்.'
  : "Hi! I'm your Campus Assistant, powered by Gemini. Ask about events, clubs, faculty, timetables or campus locations — by typing or speaking.";
 appendMessageToDOM({id:'greeting', role:'bot', text:greetText, lang:currentLang});
 renderHistory();
 setPhase('ready');
}

/* ============================================================
   SUGGESTIONS
   ============================================================ */
function renderSuggestions(){
 if(!dom.suggestions) return;
 dom.suggestions.innerHTML = SUGGESTIONS.map(s=>`<button data-suggest="${escapeHtml(s)}">${s}</button>`).join('');
}

/* ============================================================
   SPEECH RECOGNITION (voice input)
   ============================================================ */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let isListening = false;
let finalTranscript = '';
let silenceTimer = null;
const SILENCE_MS = 1600; // how long to wait after the last word before treating the sentence as finished

function langCode(lang){ return lang==='ta' ? 'ta-IN' : 'en-US'; }

function ensureRecognition(){
 if(!SR) return null;
 if(recognition) return recognition;
 recognition = new SR();
 // continuous + interim results, with our own silence timer to decide when a
 // full sentence is done — this stops the recognizer from firing onresult
 // (and sending a message) after every short pause between words.
 recognition.continuous = true;
 recognition.interimResults = true;
 recognition.maxAlternatives = 1;
 recognition.onresult = (e)=>{
  clearTimeout(silenceTimer);
  let interim = '';
  for(let i=e.resultIndex; i<e.results.length; i++){
   const res = e.results[i];
   if(res.isFinal) finalTranscript += res[0].transcript + ' ';
   else interim += res[0].transcript;
  }
  const preview = (finalTranscript + interim).trim();
  if(preview) dom.statusText.textContent = 'Listening: ' + preview;
  silenceTimer = setTimeout(finishListening, SILENCE_MS);
 };
 recognition.onerror = (e)=>{
  clearTimeout(silenceTimer);
  if(e.error === 'no-speech' || e.error === 'aborted'){ isListening=false; dom.micBtn.classList.remove('listening'); setPhase('ready'); return; }
  finishListening();
 };
 recognition.onend = ()=>{ if(isListening) finishListening(); };
 return recognition;
}
function startListening(){
 const rec = ensureRecognition();
 if(!rec) return;
 finalTranscript = '';
 try{
  rec.lang = langCode(currentLang);
  isListening = true;
  setPhase('listening');
  rec.start();
 }catch(err){ isListening=false; setPhase('ready'); }
}
// Called either by the silence timer (user paused after finishing a sentence)
// or by clicking the mic again to stop manually — either way, everything
// heard so far is sent as ONE message, not one message per word/pause.
function finishListening(){
 if(!isListening) return;
 isListening = false;
 clearTimeout(silenceTimer);
 if(recognition){ try{ recognition.stop(); }catch(err){} }
 dom.micBtn.classList.remove('listening');
 const text = finalTranscript.trim();
 finalTranscript = '';
 if(text){
  setPhase('transcribing');
  setTimeout(()=>processUserMessage(text, true), 250);
 } else {
  setPhase('ready');
 }
}

/* ============================================================
   SPEECH SYNTHESIS (voice output)
   ============================================================ */
function loadVoices(){
 if(!('speechSynthesis' in window)) return;
 voicesCache = window.speechSynthesis.getVoices();
 if(voicesCache.length){
  console.log('[voices] Available speech voices:', voicesCache.map(v=>v.name+' ('+v.lang+')'));
  console.log('[voices] Tamil-matching voices:', voicesCache.filter(v=>v.lang && v.lang.startsWith('ta')).map(v=>v.name+' ('+v.lang+')'));
 }
}
if('speechSynthesis' in window){
 loadVoices();
 window.speechSynthesis.onvoiceschanged = loadVoices;
}
function pickVoice(lang){
 const code = langCode(lang);
 return voicesCache.find(v=>v.lang===code) || voicesCache.find(v=>v.lang && v.lang.startsWith(lang)) || null;
}
let warnedNoVoice = {};
function warnIfNoVoice(lang){
 if(!('speechSynthesis' in window) || warnedNoVoice[lang]) return;
 if(!pickVoice(lang) && lang==='ta'){
  warnedNoVoice[lang] = true;
  toast('No Tamil voice installed — text will still be correct Tamil, but it may speak in English or stay silent. On Windows: Settings → Time & Language → Language & region → Add a language → தமிழ் (Tamil), then open that language\'s options and install its Speech pack. Restart your browser after.');
 }
}
// NOTE: the browser's SpeechSynthesis API doesn't expose recordable audio
// bytes, so "replay" re-invokes speak() with the same stored text rather
// than replaying a cached audio file. Swapping in a real TTS backend
// (Google Cloud Text-to-Speech) later would let this store an actual
// audio URL per message instead — see the architecture note at the top.
function speakText(msgId, text, lang, onEnd){
 if(!('speechSynthesis' in window)){ onEnd && onEnd(); return; }
 warnIfNoVoice(lang);
 window.speechSynthesis.cancel();
 const utter = new SpeechSynthesisUtterance(text);
 utter.lang = langCode(lang);
 const v = pickVoice(lang);
 if(v) utter.voice = v;
 utter.rate = 1;
 speakingMsgId = msgId;
 markRowSpeaking(msgId, true);
 utter.onend = ()=>{ markRowSpeaking(msgId, false); speakingMsgId=null; onEnd && onEnd(); };
 utter.onerror = ()=>{ markRowSpeaking(msgId, false); speakingMsgId=null; onEnd && onEnd(); };
 window.speechSynthesis.speak(utter);
}
function stopSpeech(){
 if('speechSynthesis' in window) window.speechSynthesis.cancel();
 markRowSpeaking(null, false);
 speakingMsgId = null;
}
function pauseSpeech(msgId){
 if('speechSynthesis' in window && speakingMsgId===msgId && window.speechSynthesis.speaking) window.speechSynthesis.pause();
}
function resumeOrReplay(msgId, text, lang){
 if('speechSynthesis' in window && window.speechSynthesis.paused && speakingMsgId===msgId){
  window.speechSynthesis.resume();
  return;
 }
 speakText(msgId, text, lang, ()=>{ if(phase!=='listening' && phase!=='thinking') setPhase('ready'); });
 setPhase('speaking');
}

/* ============================================================
   GEMINI STATUS BADGE
   ============================================================ */
async function checkGeminiStatus(){
 if(!dom.geminiStatus) return;
 try{
  const r = await fetch('/api/assistant/status');
  const data = await r.json();
  if(data && data.model){
    dom.geminiStatus.innerHTML = '<span class="dot" style="background:var(--teal);"></span><span>Connected to Gemini ('+data.model+')</span>';
  } else {
    dom.geminiStatus.innerHTML = '<span class="dot" style="background:var(--teal);"></span><span>Connected to Gemini</span>';
  }
 }catch(err){
  dom.geminiStatus.innerHTML = '<span class="dot" style="background:var(--coral);"></span><span>Backend not reachable — using offline demo replies</span>';
 }
}

/* ============================================================
   LOCAL FALLBACK (offline demo replies, mirrors the backend's grounding)
   ============================================================ */
function localFallbackReply(query, lang){
 const q = query.toLowerCase();
 const en = (()=>{
  if(/hackathon/.test(q)) return 'The GSAT Hackathon 2026 runs on 20 Jul from 9:00 AM in the CSE Labs — 50 teams of 2, tech stack is SQL, GitHub, live hosting and Gemini.';
  if(/hi\b|hello|hey/.test(q)) return 'Hey there! Ask me about events, clubs, faculty, campus spots or resources.';
  if(/library/.test(q)) return 'The Central Library is right next to the Admin Block — four floors, with a 24-hour hall during exams.';
  if(/hostel/.test(q)) return 'Hostel blocks are near the Innovation Center, about five minutes from the academic zone.';
  if(/club/.test(q)) return 'There are 12 active clubs across Tech, Cultural, Sports, Career and Social categories — check the Clubs page.';
  if(/hod|head of department|cse/.test(q)) return 'Dr. R. Kavitha is the Head of the CSE Department — office hours Mon–Fri, 2–4 PM.';
  if(/faculty|professor/.test(q)) return 'You can browse the full Faculty directory with office hours on the Faculty page.';
  if(/register|sign ?up|enroll/.test(q)) return 'Open any event card and tap Register — you\'ll be asked to log in if you haven\'t already.';
  if(/timetable|schedule/.test(q)) return 'Your personal timetable appears on your Student Dashboard once you\'re logged in.';
  if(/resource|handbook|calendar/.test(q)) return 'The Resources page has the Student Handbook, Academic Calendar and more.';
  if(/event/.test(q)) return 'There are 8 events this orientation week — check the Events page for dates and venues.';
  return "I'm not sure about that one yet — try the Events, Clubs, Faculty, Campus or Resources pages.";
 })();
 if(lang!=='ta') return en;
 return 'மன்னிக்கவும், தற்போது இணைப்பு கிடைக்கவில்லை. Events, Clubs, Faculty, Campus பக்கங்களில் தகவல்களைப் பார்க்கலாம். (' + en + ')';
}

/* ============================================================
   CORE SEND FLOW
   ============================================================ */
function deriveTitle(text){ return text.length>40 ? text.slice(0,40)+'…' : text; }

async function processUserMessage(text, fromVoice){
 text = (text||'').trim();
 if(!text || phase==='thinking' || phase==='listening') return;
 stopSpeech();

 if(!currentConvId){
  const conv = {id:uid(), title:deriveTitle(text), lang:currentLang, createdAt:Date.now(), updatedAt:Date.now(), messages:[], scrollPos:0};
  conversations.unshift(conv);
  currentConvId = conv.id;
  dom.messages.innerHTML = ''; // clear the transient greeting
 }
 const conv = getCurrentConv();
 const historyForApi = conv.messages.slice(-8).map(m=>({role:m.role, text:m.text}));

 const userMsg = {id:uid(), role:'user', text, lang:currentLang, ts:Date.now()};
 conv.messages.push(userMsg);
 conv.updatedAt = Date.now();
 if(conv.messages.length===1) conv.title = deriveTitle(text);
 appendMessageToDOM(userMsg);
 saveConversations();
 renderHistory();

 setPhase(fromVoice ? 'transcribing' : 'thinking');
 if(fromVoice) await new Promise(r=>setTimeout(r, 250));
 setPhase('thinking');

 let reply;
 try{
  const r = await fetch('/api/assistant', {
   method:'POST', headers:{'Content-Type':'application/json'},
   body: JSON.stringify({message:text, history:historyForApi, lang:currentLang})
  });
  const data = await r.json();
  if(data && data.reply){
   reply = data.reply;
  } else {
   reply = localFallbackReply(text, currentLang);
   if(data && data.useFallback && data.error && dom.geminiStatus){
    dom.geminiStatus.innerHTML = '<span class="dot" style="background:var(--coral);"></span><span title="'+escapeHtml(data.error)+'">Gemini error — '+escapeHtml(data.error).slice(0,90)+'</span>';
   }
  }
 }catch(err){
  reply = localFallbackReply(text, currentLang);
  if(dom.geminiStatus) dom.geminiStatus.innerHTML = '<span class="dot" style="background:var(--coral);"></span><span>Could not reach the backend at all — is `node server.js` running?</span>';
 }

 setPhase('generating');
 await new Promise(r=>setTimeout(r, 350));

 const botMsg = {id:uid(), role:'bot', text:reply, lang:currentLang, ts:Date.now()};
 conv.messages.push(botMsg);
 conv.updatedAt = Date.now();
 appendMessageToDOM(botMsg);
 saveConversations();
 renderHistory();

 setPhase('speaking');
 speakText(botMsg.id, reply, currentLang, ()=>{
  setPhase('completed');
  setTimeout(()=>{ if(phase==='completed') setPhase('ready'); }, 900);
 });
}

/* ============================================================
   EVENT WIRING
   ============================================================ */
function wireEvents(){
 dom.newChat.addEventListener('click', ()=>{ stopSpeech(); currentConvId=null; startFreshView(); closeDrawer(); });
 dom.deleteAll.addEventListener('click', deleteAllHistory);
 dom.openDrawer.addEventListener('click', openDrawerFn);
 dom.closeDrawer.addEventListener('click', closeDrawer);
 dom.backdrop.addEventListener('click', closeDrawer);

 dom.historyList.addEventListener('click', (e)=>{
  const delBtn = e.target.closest('[data-delete]');
  if(delBtn){ e.stopPropagation(); deleteConversation(delBtn.dataset.delete); return; }
  const item = e.target.closest('.va-history-item');
  if(item) loadConversation(item.dataset.id);
 });

 dom.langChips.addEventListener('click', (e)=>{
  const chip = e.target.closest('.va-chip');
  if(chip) setLang(chip.dataset.lang);
 });

 dom.suggestions.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-suggest]');
  if(btn && phase==='ready') processUserMessage(btn.dataset.suggest, false);
 });

 dom.sendBtn.addEventListener('click', ()=>{
  const text = dom.textInput.value.trim();
  dom.textInput.value = '';
  if(text) processUserMessage(text, false);
 });
 dom.textInput.addEventListener('keydown', (e)=>{
  if(e.key==='Enter' && !dom.sendBtn.disabled){
   const text = dom.textInput.value.trim();
   dom.textInput.value = '';
   if(text) processUserMessage(text, false);
  }
 });

 dom.micBtn.addEventListener('click', ()=>{
  if(!SR){ return; } // unsupported browser — text input still fully works
  if(phase==='speaking'){
   // Microphone priority: interrupt AI voice immediately, then listen
   stopSpeech();
   startListening();
   return;
  }
  if(phase==='listening'){ finishListening(); return; }
  if(phase==='thinking' || phase==='generating' || phase==='transcribing') return; // locked
  startListening();
 });

 dom.messages.addEventListener('click', (e)=>{
  const playBtn = e.target.closest('[data-play]');
  const pauseBtn = e.target.closest('[data-pause]');
  const stopBtn = e.target.closest('[data-stop]');
  if(playBtn){
   const id = playBtn.dataset.play;
   const row = e.target.closest('.va-msg-row');
   const text = row.querySelector('.va-msg').textContent;
   resumeOrReplay(id, text, currentLang);
  } else if(pauseBtn){
   pauseSpeech(pauseBtn.dataset.pause);
  } else if(stopBtn){
   stopSpeech();
   if(phase==='speaking') setPhase('ready');
  }
 });

 if(!SR){ dom.micBtn.classList.add('unsupported'); dom.micBtn.title = 'Voice input not supported in this browser — try Chrome, or use the text box.'; }

 // Stop any playback if the person navigates away from the Assistant page
 document.addEventListener('compass:navigate', (e)=>{
  if(e.detail && e.detail.page!=='assistant') stopSpeech();
 });

 // Remember scroll position per conversation
 dom.messages.addEventListener('scroll', ()=>{
  const conv = getCurrentConv();
  if(conv) conv.scrollPos = dom.messages.scrollTop;
 });
}

/* ============================================================
   INIT
   ============================================================ */
function initAssistant(){
 cacheDom();
 if(!dom.messages) return; // assistant markup not present on this page load
 wireEvents();
 renderSuggestions();
 renderHistory();
 checkGeminiStatus();
 startFreshView();
}
initAssistant();

})();
