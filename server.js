// server.js — zero-dependency backend.
// Serves the static frontend from /public and exposes a small JSON API
// for student accounts. No npm install required: only built-in Node modules.
//
// Run:   node server.js
// Open:  http://localhost:3000

const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const CAMPUS_DATA = require('./data');

// ---- tiny .env loader (no dotenv package needed) ----
(function loadEnvFile(){
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (!(key in process.env)) process.env[key] = val;
  });
})();

// ---- Gemini SDK setup ----
// As of 2026, Google is issuing two different API key formats:
//   - "Standard" keys (start with AIzaSy...) — work with raw REST calls
//   - "Auth" keys (start with AQ.Ab...) — do NOT reliably work with raw
//     REST calls to generativelanguage.googleapis.com, but DO work through
//     Google's official SDK, which handles the auth differently under the
//     hood. Since AI Studio now often issues only AQ. keys, we use the SDK
//     instead of raw fetch() so both key formats work.
let GoogleGenAI = null;
try {
  ({ GoogleGenAI } = require('@google/genai'));
} catch (e) {
  console.log('[gemini] The "@google/genai" package isn\'t installed yet.');
  console.log('[gemini] Run:  npm install @google/genai');
  console.log('[gemini] The Assistant will use offline demo replies until then.');
}

let genAI = null;
if (GoogleGenAI && process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  'gemini-2.5-flash',
  'gemini-flash-latest',
  'gemini-2.5-flash-lite'
].filter(Boolean);

if (!process.env.GEMINI_API_KEY) {
  console.log('[gemini] No GEMINI_API_KEY found (checked .env and the environment). The Assistant will use offline demo replies until one is set.');
} else if (genAI) {
  console.log('[gemini] API key loaded, using the @google/genai SDK. Will try model(s): ' + MODEL_CANDIDATES.join(', '));
}

const SYSTEM_PROMPT = `You are the AI Campus Assistant on Compass, the freshers' orientation portal for Saranathan College of Engineering, Tiruchirappalli, built by the Google Student Ambassador Team.

Answer only using the campus data below. Keep every reply under 50 words and 2-3 short sentences — always finish your sentence, never trail off. Be warm and practical for an incoming fresher. If something isn't covered by this data, say so briefly and point them to the right page (Events, Clubs, Faculty, Campus or Resources) instead of guessing.

EVENTS: ${JSON.stringify(CAMPUS_DATA.EVENTS)}
CLUBS: ${JSON.stringify(CAMPUS_DATA.CLUBS)}
FACULTY: ${JSON.stringify(CAMPUS_DATA.FACULTY)}
CAMPUS LOCATIONS: ${JSON.stringify(CAMPUS_DATA.CAMPUS)}
RESOURCES: ${JSON.stringify(CAMPUS_DATA.RESOURCES)}`;

let workingModel = null; // once we find a model that actually responds, stick with it

async function callGeminiWithModel(model, message, history, lang) {
  if (!genAI) {
    const e = new Error('Gemini SDK not available (missing package or API key)');
    throw e;
  }
  const contents = (history || []).slice(-8).map((h) => ({
    role: h.role === 'bot' ? 'model' : 'user',
    parts: [{ text: h.text }]
  }));
  contents.push({ role: 'user', parts: [{ text: message }] });

  const langInstruction = lang === 'ta'
    ? '\n\nRespond only in Tamil (தமிழ்), in natural conversational Tamil script. Keep it short since this will also be read aloud.'
    : '\n\nRespond only in English. Keep it short since this will also be read aloud.';

  let response;
  try {
    response = await genAI.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT + langInstruction,
        temperature: 0.6,
        maxOutputTokens: 1024,
        // Gemini 2.5 models "think" before answering by default, which eats
        // into maxOutputTokens (causing mid-sentence cutoffs) and adds
        // latency. Not needed for short factual lookups against our campus
        // data, so it's switched off. (Only flash/flash-lite support a
        // budget of 0 — if you ever switch to a "pro" model, remove this.)
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
  } catch (err) {
    const e = new Error(err.message || String(err));
    e.status = err.status || err.code;
    throw e;
  }

  const candidate = response && response.candidates && response.candidates[0];
  const finishReason = candidate && candidate.finishReason;
  if (finishReason && finishReason !== 'STOP') {
    console.log(`[gemini] finishReason=${finishReason} for model ${model} — reply may be incomplete.`);
  }

  function joinParts(parts){
    if (!Array.isArray(parts)) return '';
    return parts.map((p) => (p && typeof p.text === 'string' ? p.text : '')).join('');
  }
  function extractCandidateText(cand){
    if (!cand) return '';
    if (typeof cand.text === 'string' && cand.text.trim()) return cand.text;
    if (cand.content && cand.content.parts) return joinParts(cand.content.parts);
    if (cand.message && cand.message.content){
      if (typeof cand.message.content.text === 'string' && cand.message.content.text.trim()) return cand.message.content.text;
      if (Array.isArray(cand.message.content.parts)) return joinParts(cand.message.content.parts);
      if (Array.isArray(cand.message.content)) return joinParts(cand.message.content);
    }
    return '';
  }

  let text = response && typeof response.text === 'string' ? response.text.trim() : '';
  if (!text) {
    text = extractCandidateText(candidate) || '';
  }
  if (!text && Array.isArray(response && response.candidates)) {
    text = response.candidates.map(extractCandidateText).filter(Boolean).join('\n\n');
  }
  if (!text) throw new Error(`Gemini returned an empty response (finishReason: ${finishReason || 'unknown'}).`);
  return text.trim();
}

async function callGemini(message, history, lang) {
  const order = workingModel ? [workingModel, ...MODEL_CANDIDATES.filter((m) => m !== workingModel)] : MODEL_CANDIDATES;
  const errors = [];
  for (const model of order) {
    try {
      const text = await callGeminiWithModel(model, message, history, lang);
      if (model !== workingModel) { workingModel = model; console.log(`[gemini] Using model: ${model}`); }
      return text;
    } catch (err) {
      errors.push(`${model}: ${err.message}`);
      // a bad/expired key or network block fails the same way for every
      // model, so don't waste time trying the rest of the list in that case
      if (err.status === 401 || err.status === 403 || !err.status) break;
    }
  }
  throw new Error(errors.join(' | '));
}

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon'
};

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) { req.destroy(); reject(new Error('Payload too large')); }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function serveStatic(req, res) {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(PUBLIC_DIR, decodeURIComponent(filePath.split('?')[0]));
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (err, content) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];

  try {
    // ---- POST /api/register ----
    if (req.method === 'POST' && url === '/api/register') {
      const { name, email, password, dept, year, phone } = await readBody(req);
      if (!email || !password || !name || !dept || !year || !phone) {
        return sendJSON(res, 400, { error: 'Name, email, password, department, year and phone are all required.' });
      }
      const normalized = email.trim().toLowerCase();
      const existing = await db.getStudent(normalized);
      if (existing) return sendJSON(res, 409, { error: 'An account with that email already exists.' });
      const student = {
        email: normalized, name: name.trim(), password,
        dept: dept.trim(), year: year.trim(), phone: phone.trim(),
        registeredEvents: [], favClubs: [],
        notifications: [{ text: 'Welcome to Compass! Your account is ready.', time: 'just now' }]
      };
      const created = await db.createStudent(student);
      const { password: _pw, ...safe } = created;
      return sendJSON(res, 201, safe);
    }

    // ---- POST /api/login ----
    if (req.method === 'POST' && url === '/api/login') {
      const { email, password } = await readBody(req);
      if (!email || !password) return sendJSON(res, 400, { error: 'Email and password are required.' });
      const normalized = email.trim().toLowerCase();
      const student = await db.getStudent(normalized);
      if (!student) return sendJSON(res, 404, { error: 'No account found for that email.' });
      if (student.password !== password) return sendJSON(res, 401, { error: 'Incorrect password.' });
      const { password: _pw, ...safe } = student;
      return sendJSON(res, 200, safe);
    }

    // ---- GET /api/students/:email  (rehydrate a session on page reload) ----
    if (req.method === 'GET' && url.startsWith('/api/students/')) {
      const email = decodeURIComponent(url.split('/api/students/')[1] || '').toLowerCase();
      const student = await db.getStudent(email);
      if (!student) return sendJSON(res, 404, { error: 'Not found' });
      const { password: _pw, ...safe } = student;
      return sendJSON(res, 200, safe);
    }

    // ---- PUT /api/students/:email  (save profile edits, event registrations, favourites) ----
    if (req.method === 'PUT' && url.startsWith('/api/students/')) {
      const email = decodeURIComponent(url.split('/api/students/')[1] || '').toLowerCase();
      const patch = await readBody(req);
      delete patch.email; delete patch.password; // never overwrite identity/credentials via this route
      const updated = await db.updateStudent(email, patch);
      if (!updated) return sendJSON(res, 404, { error: 'Not found' });
      const { password: _pw, ...safe } = updated;
      return sendJSON(res, 200, safe);
    }

    // ---- GET /api/assistant/status ----
    if (req.method === 'GET' && url === '/api/assistant/status') {
      return sendJSON(res, 200, {
        connected: !!genAI,
        model: workingModel || MODEL_CANDIDATES[0],
        reason: !process.env.GEMINI_API_KEY ? 'no_api_key' : (!GoogleGenAI ? 'missing_package' : null)
      });
    }

    // ---- POST /api/assistant  (the AI Campus Assistant chat) ----
    if (req.method === 'POST' && url === '/api/assistant') {
      const { message, history, lang } = await readBody(req);
      if (!message) return sendJSON(res, 400, { error: 'Message required' });
      if (!genAI) {
        const reason = !process.env.GEMINI_API_KEY ? 'no_api_key' : 'missing_package';
        return sendJSON(res, 200, { reply: null, useFallback: true, reason });
      }
      try {
        const reply = await callGemini(message, history || [], lang);
        return sendJSON(res, 200, { reply, useFallback: false });
      } catch (err) {
        console.error('[gemini] All model attempts failed:', err.message);
        return sendJSON(res, 200, { reply: null, useFallback: true, reason: 'api_error', error: err.message });
      }
    }

    // ---- everything else: static frontend files ----
    if (req.method === 'GET') return serveStatic(req, res);

    sendJSON(res, 405, { error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { error: err.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Compass server running → http://localhost:${PORT}  (db mode: ${db.mode})`);
});