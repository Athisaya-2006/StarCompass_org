/* ============================================================
   DATA
   ============================================================ */
const EVENTS = [
 {id:'e1', title:'Freshers\' Welcome Party', cat:'Social', date:'20 Jul 2026', time:'6:00 PM', venue:'Main Auditorium', seats:'420 / 500', desc:'Kick off orientation week with music, games and a campus-wide welcome from every club.'},
 {id:'e2', title:'GSAT Hackathon 2026', cat:'Tech', date:'20 Jul 2026', time:'9:00 AM', venue:'CSE Labs', seats:'50 teams', desc:'Build an AI-powered freshers portal in a day — the very challenge this site answers.'},
 {id:'e3', title:'Orientation Session', cat:'Academic', date:'17 Jul 2026', time:'10:00 AM', venue:'Seminar Hall 1', seats:'Open', desc:'Meet your HoDs, understand the curriculum, and get your ID cards.'},
 {id:'e4', title:'Tech Talk: Prompt Engineering', cat:'Tech', date:'22 Jul 2026', time:'3:30 PM', venue:'Innovation Center', seats:'180 / 200', desc:'A hands-on session on getting the most out of Gemini and other LLMs.'},
 {id:'e5', title:'Passport Register', cat:'Cultural', date:'23 Jul 2026', time:'7:00 PM', venue:'Open Air Theatre', seats:'Unlimited', desc:'Dance, music and drama from every department, capped with a fireworks finale.'},
 {id:'e6', title:'Inter-Dept Sports Meet', cat:'Sports', date:'25 Jul 2026', time:'8:00 AM', venue:'Sports Complex', seats:'Team entry', desc:'Cricket, football and athletics — represent your department on day one.'},
 {id:'e7', title:'Resume & LinkedIn Workshop', cat:'Career', date:'27 Jul 2026', time:'2:00 PM', venue:'Placement Cell', seats:'150 / 150', desc:'Placement cell mentors help you build a resume that survives the first filter.'},
 {id:'e8', title:'Club Expo', cat:'Social', date:'21 Jul 2026', time:'11:00 AM', venue:'Central Quad', seats:'Walk-in', desc:'Every club sets up a stall — the fastest way to find where you belong.'},
  {id:'e9', title:'Blood Donation Camp ', cat:'Help', date:'12 Jul 2026', time:'10:00 AM', venue:'EEE block', seats:'Walk-in', desc:'Everystudent who are interested in blood camp can enroll — the best way to help humanity .'}
];
const CLUBS = [
 {id:'c1', name:'GSAT — Google Student Ambassador Team', cat:'Tech', members:64, desc:'Runs Google DevFest, study jams and this very hackathon.', color:'linear-gradient(135deg,#4285F4,#34A853)'},
 {id:'c2', name:'Coding Club', cat:'Tech', members:210, desc:'Weekly contests, DSA sheets and peer-led workshops.', color:'linear-gradient(135deg,#17C3A2,#0c8a72)'},
 {id:'c3', name:'Robotics & IoT Society', cat:'Tech', members:88, desc:'Builds line-followers, drones and campus automation projects.', color:'linear-gradient(135deg,#7CC7FF,#3a7bd5)'},
 {id:'c4', name:'Dance Crew — Rhythm', cat:'Cultural', members:74, desc:'Classical and freestyle — auditions every August.', color:'linear-gradient(135deg,#FF6B6B,#c0392b)'},
 {id:'c5', name:'Music Club — Echoes', cat:'Cultural', members:59, desc:'Jam sessions every Friday, open mic every month.', color:'linear-gradient(135deg,#FFB100,#c47c00)'},
 {id:'c6', name:'Photography Club — Frame', cat:'Cultural', members:47, desc:'Covers every campus event; runs an annual exhibition.', color:'linear-gradient(135deg,#a18cd1,#fbc2eb)'},
 {id:'c7', name:'Literary & Debate Society', cat:'Academic', members:65, desc:'Quizzing, debating and a termly campus magazine.', color:'linear-gradient(135deg,#43cea2,#185a9d)'},
 {id:'c8', name:'E-Cell — Entrepreneurship Cell', cat:'Career', members:52, desc:'Pitch nights, startup mentoring and a seed-fund challenge.', color:'linear-gradient(135deg,#f7971e,#ffd200)'},
 {id:'c9', name:'NSS — National Service Scheme', cat:'Social', members:130, desc:'Village outreach camps and blood donation drives.', color:'linear-gradient(135deg,#56ab2f,#a8e063)'},
 {id:'c10', name:'Sports Club', cat:'Sports', members:190, desc:'Trials for cricket, football, badminton and athletics.', color:'linear-gradient(135deg,#ff512f,#dd2476)'},
 {id:'c11', name:'Yoga & Wellness Circle', cat:'Social', members:38, desc:'Early-morning sessions, three days a week.', color:'linear-gradient(135deg,#38ef7d,#11998e)'},
 {id:'c12', name:'Robotics Racing — Formula Student', cat:'Tech', members:41, desc:'Designs and races a student formula car every year.', color:'linear-gradient(135deg,#ee9ca7,#ffdde1)'}
];
const FACULTY = [
 {id:'f1', name:'Dr. P.Arun Prasad', dept:'CSE', role:'Head of Department', email:'arun.cse@saranathan.ac.in', hours:'Mon–Fri, 2–4 PM'},
 {id:'f2', name:'Dr. R.Karthik', dept:'CSE', role:'AI & ML Coordinator', email:'karthik.cse@saranathan.ac.in', hours:'Tue & Thu, 10–12 PM'},
 {id:'f3', name:'Prof. Meera Balan', dept:'ECE', role:'Assistant Professor', email:'meera.ece@saranathan.ac.in', hours:'Mon–Wed, 1–3 PM'},
 {id:'f4', name:'Dr. R.Kavitha', dept:'Mechanical', role:'Head of Department', email:'kavitha.mech@saranathan.ac.in', hours:'Fri, 11–1 PM'},
 {id:'f5', name:'Prof. Lakshmi Narayanan', dept:'IT', role:'Placement Coordinator', email:'lakshmi.it@saranathan.ac.in', hours:'Daily, 3–5 PM'},
 {id:'f6', name:'Dr. J. Selvam', dept:'Civil', role:'Associate Professor', email:'selvam.civil@saranathan.ac.in', hours:'Mon & Wed, 9–11 AM'},
 {id:'f7', name:'Dr. Priya Anand', dept:'EEE', role:'Head of Department', email:'priya.eee@saranathan.ac.in', hours:'Tue & Fri, 2–4 PM'},
 {id:'f8', name:'Prof. L.Ramya', dept:'AIML', role:'Lab In-charge', email:'karthik.aiml@saranathan.ac.in', hours:'Mon–Fri, 10–11 AM'}
];
const CAMPUS = [
 {id:'p1', name:'Central Library', desc:'Four floors, 24-hour reading hall during exams, and a digital archive terminal on the ground floor.', lat:10.757351830337337, lng:78.65137954236212, color:'#000000', emoji:'📚'},
 {id:'p2', name:'CSE Labs Block', desc:'Where the hackathon runs — six labs, GPU workstations, and the departmental server room.', lat:10.756656309941315, lng:78.65177281429455, color:'#FF8C00', emoji:'💻'},
 {id:'p3', name:'Main Auditorium', desc:'900-seat venue for orientation, cultural nights and guest lectures.', lat:10.755483, lng:78.650499, color:'#00A651', emoji:'🎤'},
 {id:'p4', name:'Cafeteria', desc:'Open 7 AM – 9 PM; the unofficial meeting point between classes.', lat:10.756949740772688, lng:78.65071171731984, color:'#7A1FA2', emoji:'☕'},
 {id:'p5', name:'Hostel Blocks', desc:'Separate blocks for men and women, five minutes from the academic zone.', lat:10.758847061442236, lng:78.65096798616219, color:'#FFD700', emoji:'🏠'},
 {id:'p6', name:'Bus Parking', desc:'Dedicated bus parking area for college transport and event shuttles.', lat:10.757706, lng:78.651144, color:'#555555', emoji:'🅿️'},
 {id:'p7', name:'Admin Block', desc:'Fee payments, ID cards, bonafide certificates and the registrar\'s office.', lat:10.756131, lng:78.651396, color:'#74C0FC', emoji:'🏛️'},
 {id:'p8', name:'Playground', desc:'Outdoor space for sports events, campus festivals and open-air rehearsals.', lat:10.755815, lng:78.652174, color:'#F7C948', emoji:'🏟️'}
];
const RESOURCES = [
 {id:'r1', name:'Student Handbook 2026', size:'2.4 MB · PDF', icon:'book', link:'/sce%20handbook.pdf', desc:'College policies, campus services, and essential orientation checklists.'},
 {id:'r2', name:'Academic Calendar', size:'520 KB · JPEG', icon:'calendar', link:'/planner.jpeg', desc:'Semester dates, exam windows and important holiday breaks.'},
 {id:'r3', name:'Campus Bus Routes', size:'175 KB · JPEG', icon:'bus', link:'/bus.jpeg', desc:'Entry/exit stops, shuttle schedules and nearest pickup points.'},
 {id:'r4', name:'CSE Faculty Directory', size:'Official site', icon:'book', link:'https://saranathan.ac.in/dept.php?dept=CSE&tgt=faculty', desc:'Faculty contacts, specializations and office hours for the CSE department.'},
 {id:'r5', name:'Scholarship Guide', size:'Dummy content · PDF', icon:'award', link:'/scholr.pdf', desc:'Eligibility criteria, application steps and deadlines for available scholarships.'},
 {id:'r6', name:'Previous Year Question Papers', size:'Link', icon:'file', link:'https://drive.google.com/drive/folders/1jgUywox4M9qGfXDoRf-UMVrFfaKvruOm', desc:'Sample papers across core subjects to help you prepare for semester exams.'},
 {id:'r7', name:'Placement Details', size:'Web page', icon:'briefcase', link:'https://saranathan.ac.in/placement.php?tgt=placlist2&yr=2019-2023', desc:'Placement cell updates, company lists and drive schedules.'}
];
const ICONS = {
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
 calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
 bus:'<path d="M4 17h16V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/><line x1="4" y1="11" x2="20" y2="11"/>',
 award:'<circle cx="12" cy="8" r="6"/><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5"/>',
 file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
 briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
 heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>'
};
function icon(name, extra){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '+(extra||'')+'>'+ICONS[name]+'</svg>';}

/* ============================================================
   I18N
   ============================================================ */
const I18N = {
 en:{tagline:'Saranathan Freshers Hub', nav_home:'Home', nav_events:'Events', nav_clubs:'Clubs', nav_faculty:'Faculty', nav_campus:'Campus', nav_assistant:'Assistant', nav_resources:'Resources', nav_login:'Log in', search_ph:'Search Compass...',
  hero_eyebrow:'Orientation 2026 · Batch of Explorers', hero_title:'Find your way around <em>college</em>, before day one.', hero_lead:'Events, clubs, faculty and campus — explored freely as a guest. Sign in only when you want it to remember you.',
  hero_cta1:'Explore campus', hero_cta2:'Ask the AI Assistant', compass_core:'FRESHER MODE',
  stat_events:'Live events', stat_clubs:'Active clubs', stat_faculty:'Faculty listed', stat_teams:'Hackathon teams',
  modes_eyebrow:'Two ways in', modes_title:'Explore freely. Personalize if you want.', modes_desc:'No account needed to look around — only for the things that need to remember you.',
  guest_tag:'Guest Mode · Default', guest_title:'Look around, no strings attached', guest_desc:'Browse every event, club, faculty profile and campus corner. Chat with the AI Assistant. Nothing is locked behind a login.',
  student_tag:'Student Mode · Optional', student_title:'Sign in when it gets personal', student_desc:'Register for events, save favourite clubs, view your timetable and get notifications made for you.',
  ai_tag:'Gemini-Powered', ai_title:'An assistant that knows the campus', ai_desc:'Ask about timetables, clubs, registration deadlines or where the library is — in plain language, any time.',
  upcoming_eyebrow:"Don't miss these", upcoming_title:'Coming up this orientation week',
  events_eyebrow:"What's on", events_title:'Campus events', events_desc:'Browse freely. Registering saves your spot to your student dashboard.',
  clubs_eyebrow:'Find your people', clubs_title:'Clubs & communities', clubs_desc:'Twelve active clubs across tech, culture and sport. Tap ♥ to save your favourites once signed in.',
  faculty_eyebrow:'Meet the department', faculty_title:'Faculty directory', faculty_desc:'Office hours and contact details for your first point of academic contact.',
  campus_eyebrow:'Get your bearings', campus_title:'Explore the campus', campus_desc:'Tap a pin or a location card to see what happens there.',
  assist_eyebrow:'Available 24/7 · No login needed', assist_title:'AI Campus Assistant', assist_desc:'Ask about events, clubs, faculty, timetables or campus locations.', assist_try:'Try asking', chat_ph:'Type your question...', chat_send:'Ask',
  res_eyebrow:'Bookmark these', res_title:'Resources', res_desc:'Handbooks, calendars and guides every fresher should have on hand.',
  dash_eyebrow:'Personal · Private to you', dash_title:'Your dashboard', dash_edit:'Edit profile', dash_logout:'Log out', dash_notif:'Notifications', dash_events:'Registered events', dash_clubs:'Favourite clubs', dash_tt:'Your timetable',
  tab_login:'Log in', tab_register:'Register', auth_login_title:'Welcome back', auth_login_sub:'Log in to pick up where you left off.', auth_login_btn:'Log in',
  field_name:'Full name', field_email:'College email', field_pass:'Password', field_dept:'Department', field_year:'Year', field_phone:'Phone',
  auth_note:'Demo authentication for this hackathon build — details are stored only to power your dashboard, not verified against real college records.',
  profile_title:'Edit profile', profile_sub:'Kept up to date, kept private to you.', profile_save:'Save changes',
  footer_by:'Built by the Google Student Ambassador Team, Saranathan College of Engineering.', footer_guest:'Browsing as Guest'},
 ta:{tagline:'சரணதன் புதியோர் மையம்', nav_home:'முகப்பு', nav_events:'நிகழ்வுகள்', nav_clubs:'கழகங்கள்', nav_faculty:'பேராசிரியர்கள்', nav_campus:'வளாகம்', nav_assistant:'உதவியாளர்', nav_resources:'வளங்கள்', nav_login:'உள்நுழை', search_ph:'தேடு...',
  hero_eyebrow:'அறிமுக வாரம் 2026', hero_title:'கல்லூரியை <em>முதல் நாளுக்கு</em> முன்பே அறிந்து கொள்ளுங்கள்.', hero_lead:'நிகழ்வுகள், கழகங்கள், பேராசிரியர்கள் — விருந்தினராக சுதந்திரமாக பார்வையிடலாம். தனிப்பயனாக்க வேண்டும் எனில் மட்டும் உள்நுழையவும்.',
  hero_cta1:'வளாகத்தை ஆராயுங்கள்', hero_cta2:'AI உதவியாளரிடம் கேளுங்கள்', compass_core:'புதியோர் பயன்முறை',
  stat_events:'நிகழ்வுகள்', stat_clubs:'கழகங்கள்', stat_faculty:'பேராசிரியர்கள்', stat_teams:'ஹேக்கத்தான் குழுக்கள்',
  modes_eyebrow:'இரண்டு வழிகள்', modes_title:'சுதந்திரமாக ஆராயுங்கள். தேவைப்பட்டால் தனிப்பயனாக்குங்கள்.', modes_desc:'பார்வையிட கணக்கு தேவையில்லை — நினைவில் வைக்க வேண்டியவற்றுக்கு மட்டும்.',
  guest_tag:'விருந்தினர் பயன்முறை', guest_title:'சுதந்திரமாக உலாவுங்கள்', guest_desc:'அனைத்து நிகழ்வுகள், கழகங்கள், பேராசிரியர் விவரங்கள், வளாகத்தையும் பார்க்கலாம். எதுவும் பூட்டப்படவில்லை.',
  student_tag:'மாணவர் பயன்முறை', student_title:'தனிப்பயன் தேவைப்படும்போது உள்நுழையுங்கள்', student_desc:'நிகழ்வுகளுக்கு பதிவு செய்யவும், விருப்பமான கழகங்களை சேமிக்கவும், அட்டவணையை பார்க்கவும்.',
  ai_tag:'Gemini ஆல் இயக்கப்படுகிறது', ai_title:'வளாகத்தை அறிந்த உதவியாளர்', ai_desc:'அட்டவணை, கழகங்கள், பதிவு தேதிகள் பற்றி எளிய மொழியில் கேளுங்கள்.',
  upcoming_eyebrow:'தவறவிடாதீர்கள்', upcoming_title:'இந்த வாரம் நடைபெறும் நிகழ்வுகள்',
  events_eyebrow:'நடக்கும் நிகழ்வுகள்', events_title:'வளாக நிகழ்வுகள்', events_desc:'சுதந்திரமாக உலாவுங்கள். பதிவு செய்தால் உங்கள் டாஷ்போர்டில் சேமிக்கப்படும்.',
  clubs_eyebrow:'உங்கள் குழுவைக் கண்டறியுங்கள்', clubs_title:'கழகங்கள்', clubs_desc:'பன்னிரண்டு செயலில் உள்ள கழகங்கள். உள்நுழைந்த பின் ♥ ஐ தட்டி விருப்பமானதை சேமிக்கவும்.',
  faculty_eyebrow:'துறையை சந்திக்கவும்', faculty_title:'பேராசிரியர் பட்டியல்', faculty_desc:'அலுவலக நேரம் மற்றும் தொடர்பு விவரங்கள்.',
  campus_eyebrow:'வளாகத்தை அறியுங்கள்', campus_title:'வளாகத்தை ஆராயுங்கள்', campus_desc:'ஒரு இடத்தை தட்டி மேலும் அறியவும்.',
  assist_eyebrow:'எப்போதும் கிடைக்கும்', assist_title:'AI வளாக உதவியாளர்', assist_desc:'நிகழ்வுகள், கழகங்கள், பேராசிரியர்கள் பற்றி கேளுங்கள்.', assist_try:'இவற்றை கேட்டு பாருங்கள்', chat_ph:'உங்கள் கேள்வியை தட்டச்சு செய்யவும்...', chat_send:'கேளுங்கள்',
  res_eyebrow:'இவற்றை சேமிக்கவும்', res_title:'வளங்கள்', res_desc:'கையேடுகள், நாட்காட்டிகள் மற்றும் வழிகாட்டிகள்.',
  dash_eyebrow:'தனிப்பட்டது', dash_title:'உங்கள் டாஷ்போர்டு', dash_edit:'சுயவிவரத்தை திருத்தவும்', dash_logout:'வெளியேறு', dash_notif:'அறிவிப்புகள்', dash_events:'பதிவு செய்த நிகழ்வுகள்', dash_clubs:'விருப்பமான கழகங்கள்', dash_tt:'உங்கள் அட்டவணை',
  tab_login:'உள்நுழை', tab_register:'பதிவு செய்க', auth_login_title:'மீண்டும் வருக', auth_login_sub:'தொடர உள்நுழையவும்.', auth_login_btn:'உள்நுழை',
  field_name:'முழு பெயர்', field_email:'கல்லூரி மின்னஞ்சல்', field_pass:'கடவுச்சொல்', field_dept:'துறை', field_year:'ஆண்டு', field_phone:'தொலைபேசி',
  auth_note:'இது ஒரு ஹேக்கத்தான் மாதிரி — விவரங்கள் டாஷ்போர்டுக்காக மட்டும் சேமிக்கப்படுகின்றன.',
  profile_title:'சுயவிவரத்தை திருத்தவும்', profile_sub:'உங்களுக்கே தனிப்பட்டது.', profile_save:'சேமிக்கவும்',
  footer_by:'Google மாணவர் தூதுக் குழுவால் உருவாக்கப்பட்டது.', footer_guest:'விருந்தினராக உலாவுகிறீர்கள்'},
 hi:{tagline:'सरनाथन फ्रेशर्स हब', nav_home:'होम', nav_events:'इवेंट्स', nav_clubs:'क्लब', nav_faculty:'फैकल्टी', nav_campus:'कैंपस', nav_assistant:'सहायक', nav_resources:'संसाधन', nav_login:'लॉग इन', search_ph:'खोजें...',
  hero_eyebrow:'ओरिएंटेशन 2026', hero_title:'पहले दिन से पहले ही <em>कॉलेज</em> को जानें।', hero_lead:'इवेंट्स, क्लब, फैकल्टी और कैंपस — गेस्ट के रूप में स्वतंत्र रूप से देखें। लॉगिन तभी करें जब पर्सनलाइज़ेशन चाहिए।',
  hero_cta1:'कैंपस देखें', hero_cta2:'AI सहायक से पूछें', compass_core:'फ्रेशर मोड',
  stat_events:'लाइव इवेंट्स', stat_clubs:'सक्रिय क्लब', stat_faculty:'फैकल्टी सूचीबद्ध', stat_teams:'हैकाथॉन टीमें',
  modes_eyebrow:'दो तरीके', modes_title:'स्वतंत्र रूप से देखें। ज़रूरत पड़ने पर पर्सनलाइज़ करें।', modes_desc:'देखने के लिए अकाउंट ज़रूरी नहीं — केवल याद रखने वाली चीज़ों के लिए।',
  guest_tag:'गेस्ट मोड', guest_title:'बिना किसी शर्त के देखें', guest_desc:'हर इवेंट, क्लब, फैकल्टी और कैंपस देखें। AI सहायक से बात करें। कुछ भी लॉक नहीं है।',
  student_tag:'स्टूडेंट मोड', student_title:'ज़रूरत पड़ने पर लॉगिन करें', student_desc:'इवेंट रजिस्टर करें, पसंदीदा क्लब सेव करें, टाइमटेबल देखें।',
  ai_tag:'Gemini-संचालित', ai_title:'कैंपस को जानने वाला सहायक', ai_desc:'टाइमटेबल, क्लब, रजिस्ट्रेशन डेडलाइन के बारे में पूछें।',
  upcoming_eyebrow:'यह मत चूकिए', upcoming_title:'इस सप्ताह के इवेंट्स',
  events_eyebrow:'क्या चल रहा है', events_title:'कैंपस इवेंट्स', events_desc:'स्वतंत्र रूप से ब्राउज़ करें। रजिस्टर करने पर डैशबोर्ड में सेव होगा।',
  clubs_eyebrow:'अपने लोग खोजें', clubs_title:'क्लब और समुदाय', clubs_desc:'बारह सक्रिय क्लब। लॉगिन के बाद ♥ दबाकर सेव करें।',
  faculty_eyebrow:'विभाग से मिलें', faculty_title:'फैकल्टी डायरेक्टरी', faculty_desc:'ऑफिस आवर्स और संपर्क विवरण।',
  campus_eyebrow:'दिशा समझें', campus_title:'कैंपस देखें', campus_desc:'किसी पिन या स्थान पर टैप करें।',
  assist_eyebrow:'हमेशा उपलब्ध', assist_title:'AI कैंपस सहायक', assist_desc:'इवेंट्स, क्लब, फैकल्टी के बारे में पूछें।', assist_try:'यह पूछ कर देखें', chat_ph:'अपना सवाल लिखें...', chat_send:'पूछें',
  res_eyebrow:'इन्हें सेव करें', res_title:'संसाधन', res_desc:'हैंडबुक, कैलेंडर और गाइड।',
  dash_eyebrow:'निजी', dash_title:'आपका डैशबोर्ड', dash_edit:'प्रोफ़ाइल संपादित करें', dash_logout:'लॉग आउट', dash_notif:'सूचनाएं', dash_events:'रजिस्टर्ड इवेंट्स', dash_clubs:'पसंदीदा क्लब', dash_tt:'आपका टाइमटेबल',
  tab_login:'लॉग इन', tab_register:'रजिस्टर करें', auth_login_title:'वापसी पर स्वागत है', auth_login_sub:'जारी रखने के लिए लॉगिन करें।', auth_login_btn:'लॉग इन',
  field_name:'पूरा नाम', field_email:'कॉलेज ईमेल', field_pass:'पासवर्ड', field_dept:'विभाग', field_year:'वर्ष', field_phone:'फ़ोन',
  auth_note:'यह हैकाथॉन डेमो प्रमाणीकरण है — विवरण केवल डैशबोर्ड के लिए संग्रहीत हैं।',
  profile_title:'प्रोफ़ाइल संपादित करें', profile_sub:'हमेशा अपडेटेड, हमेशा निजी।', profile_save:'बदलाव सहेजें',
  footer_by:'Google स्टूडेंट एंबेसडर टीम द्वारा निर्मित।', footer_guest:'गेस्ट के रूप में ब्राउज़ कर रहे हैं'}
};
let currentLang = 'en';
function applyI18n(){
 const dict = I18N[currentLang];
 document.querySelectorAll('[data-i18n]').forEach(el=>{
  const key = el.getAttribute('data-i18n');
  if(dict[key]) el.innerHTML = dict[key];
 });
 document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
  const key = el.getAttribute('data-i18n-ph');
  if(dict[key]) el.setAttribute('placeholder', dict[key]);
 });
}

/* ============================================================
   STATE
   ============================================================ */
let CURRENT_USER = null; // {email,name,dept,year,phone,registeredEvents:[],favClubs:[],notifications:[]}
let authMode = 'login';

/* ============================================================
   NAVIGATION
   ============================================================ */
function navigate(page){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 const target = document.getElementById('page-'+page);
 if(target) target.classList.add('active');
 document.querySelectorAll('nav.links button').forEach(b=>b.classList.toggle('active', b.dataset.page===page));
 window.scrollTo({top:0, behavior:'smooth'});
 document.getElementById('searchResults').style.display='none';
 document.dispatchEvent(new CustomEvent('compass:navigate', {detail:{page}}));
}
document.getElementById('navLinks').addEventListener('click', e=>{
 const btn = e.target.closest('button[data-page]');
 if(btn) navigate(btn.dataset.page);
});
document.getElementById('hamburger').addEventListener('click', ()=>{
 const nl = document.getElementById('navLinks');
 nl.style.display = (nl.style.display==='flex') ? 'none' : 'flex';
 nl.style.cssText += 'flex-direction:column; position:absolute; top:60px; left:0; right:0; background:var(--panel); padding:10px; border-bottom:1px solid var(--line);';
});

/* ============================================================
   TOASTS
   ============================================================ */
function toast(msg){
 const wrap = document.getElementById('toastWrap');
 const el = document.createElement('div');
 el.className='toast';
 el.textContent = msg;
 wrap.appendChild(el);
 setTimeout(()=>{ el.style.opacity='0'; el.style.transition='.4s'; setTimeout(()=>el.remove(), 400); }, 3200);
}

/* ============================================================
   MODALS
   ============================================================ */
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-backdrop').forEach(m=>{
 m.addEventListener('click', e=>{ if(e.target===m) m.classList.remove('open'); });
});

function requireAuth(afterMsg){
 if(CURRENT_USER) return true;
 openModal('authModal');
 toast('Log in to ' + afterMsg);
 return false;
}

/* ============================================================
   API — talks to the real Node backend (server.js) which stores
   student accounts in a SQL database (see db.js). This is the
   only place credentials or personal data leave the browser.
   ============================================================ */
const API = {
 async register(name, email, password, dept, year, phone){
  const r = await fetch('/api/register', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password,dept,year,phone})});
  const data = await r.json();
  if(!r.ok) throw new Error(data.error || 'Registration failed');
  return data;
 },
 async login(email, password){
  const r = await fetch('/api/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})});
  const data = await r.json();
  if(!r.ok) throw new Error(data.error || 'Login failed');
  return data;
 },
 async fetchStudent(email){
  const r = await fetch('/api/students/'+encodeURIComponent(email));
  if(!r.ok) return null;
  return r.json();
 },
 async updateStudent(email, patch){
  const r = await fetch('/api/students/'+encodeURIComponent(email), {method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(patch)});
  const data = await r.json();
  if(!r.ok) throw new Error(data.error || 'Update failed');
  return data;
 }
};
const SESSION_KEY = 'compass_session_email';

/* ============================================================
   AUTH
   ============================================================ */
document.getElementById('navAuthBtn').addEventListener('click', ()=>{
 if(CURRENT_USER){ navigate('dashboard'); } else { openModal('authModal'); }
});
function switchAuthTab(mode){
 authMode = mode;
 document.getElementById('tabLogin').classList.toggle('active', mode==='login');
 document.getElementById('tabRegister').classList.toggle('active', mode==='register');
 document.getElementById('fieldName').style.display = mode==='register' ? 'flex' : 'none';
 document.getElementById('fieldDeptYear').style.display = mode==='register' ? 'grid' : 'none';
 document.getElementById('fieldPhone').style.display = mode==='register' ? 'flex' : 'none';
 const dict = I18N[currentLang];
 document.getElementById('authTitle').textContent = mode==='login' ? dict.auth_login_title : dict.tab_register;
 document.getElementById('authSub').textContent = mode==='login' ? dict.auth_login_sub : dict.profile_sub;
 document.getElementById('authSubmitBtn').textContent = mode==='login' ? dict.auth_login_btn : dict.tab_register;
}
async function handleAuthSubmit(e){
 e.preventDefault();
 const submitBtn = document.getElementById('authSubmitBtn');
 const email = document.getElementById('authEmail').value.trim().toLowerCase();
 const pass = document.getElementById('authPass').value;
 submitBtn.disabled = true;
 const originalLabel = submitBtn.textContent;
 submitBtn.textContent = '...';
 try{
  let user;
  if(authMode==='register'){
   const name = document.getElementById('authName').value.trim() || 'Fresher';
   const dept = document.getElementById('authDept').value;
   const year = document.getElementById('authYear').value;
   const phone = document.getElementById('authPhone').value.trim();
   if(!dept || !year || !phone){
    throw new Error('Please enter department, year and phone number to complete registration.');
   }
   user = await API.register(name, email, pass, dept, year, phone);
   toast('Account created — welcome, '+user.name+'!');
  } else {
   user = await API.login(email, pass);
   toast('Welcome back, '+user.name+'!');
  }
  CURRENT_USER = user;
  localStorage.setItem(SESSION_KEY, user.email);
  closeModal('authModal');
  onAuthChanged();
  navigate('dashboard');
 }catch(err){
  console.error(err);
  toast(err.message || 'Something went wrong. Please try again.');
 }finally{
  submitBtn.disabled = false;
  submitBtn.textContent = originalLabel;
 }
 return false;
}
async function persistUser(){
 if(!CURRENT_USER) return;
 try{
  const {email, password, ...patch} = CURRENT_USER;
  const updated = await API.updateStudent(CURRENT_USER.email, patch);
  CURRENT_USER = updated;
 }catch(err){
  console.error(err);
  toast('Could not save to the server — check that the backend is running.');
 }
}
function logout(){
 CURRENT_USER = null;
 localStorage.removeItem(SESSION_KEY);
 onAuthChanged();
 navigate('home');
 toast('Logged out. Still free to browse as a guest.');
}
async function restoreSession(){
 const email = localStorage.getItem(SESSION_KEY);
 if(!email) return;
 const user = await API.fetchStudent(email);
 if(user){ CURRENT_USER = user; onAuthChanged(); }
 else localStorage.removeItem(SESSION_KEY);
}
function onAuthChanged(){
 const authBtn = document.getElementById('navAuthBtn');
 const dict = I18N[currentLang];
 if(CURRENT_USER){
  authBtn.textContent = CURRENT_USER.name.split(' ')[0];
  document.getElementById('footerModeText').textContent = 'Signed in as '+CURRENT_USER.name;
  document.getElementById('footerModeDot').style.background = 'var(--marigold)';
  renderDashboard();
 } else {
  authBtn.textContent = dict.nav_login;
  document.getElementById('footerModeText').textContent = dict.footer_guest;
  document.getElementById('footerModeDot').style.background = 'var(--teal)';
 }
 renderEvents(); renderClubs();
}

function openProfileEdit(){
 if(!CURRENT_USER) return;
 document.getElementById('profName').value = CURRENT_USER.name;
 document.getElementById('profDept').value = CURRENT_USER.dept;
 document.getElementById('profYear').value = CURRENT_USER.year;
 document.getElementById('profPhone').value = CURRENT_USER.phone;
 openModal('profileModal');
}
async function saveProfile(e){
 e.preventDefault();
 CURRENT_USER.name = document.getElementById('profName').value.trim() || CURRENT_USER.name;
 CURRENT_USER.dept = document.getElementById('profDept').value;
 CURRENT_USER.year = document.getElementById('profYear').value;
 CURRENT_USER.phone = document.getElementById('profPhone').value.trim();
 await persistUser();
 closeModal('profileModal');
 onAuthChanged();
 toast('Profile updated.');
 return false;
}

/* ============================================================
   EVENTS
   ============================================================ */
let eventFilter = 'All';
function renderEventFilters(){
 const cats = ['All', ...new Set(EVENTS.map(e=>e.cat))];
 document.getElementById('eventFilters').innerHTML = cats.map(c=>
  `<button class="chip ${c===eventFilter?'active':''}" onclick="setEventFilter('${c}')">${c}</button>`).join('');
}
function setEventFilter(c){ eventFilter=c; renderEventFilters(); renderEvents(); }
function isRegistered(id){ return CURRENT_USER && CURRENT_USER.registeredEvents.includes(id); }
function eventEmoji(ev){
 const title = ev.title.toLowerCase();
 if(title.includes('welcome')) return '🎉';
 if(title.includes('hackathon')) return '💻';
 if(title.includes('orientation')) return '🎓';
 if(title.includes('prompt engineering')) return '🤖';
 if(title.includes('cultural night') || title.includes('rangoli')) return '🎭';
 if(title.includes('sports') || title.includes('meet')) return '🏅';
 if(title.includes('resume') || title.includes('linkedin') || title.includes('workshop')) return '📄';
 if(title.includes('club expo')) return '🎪';
 return '📌';
}
function eventCard(ev, compact){
 const reg = isRegistered(ev.id);
 return `<div class="card">
  <span class="tag"><span class="tag-emoji">${eventEmoji(ev)}</span>${ev.cat}</span>
  <h3>${ev.title}</h3>
  <p>${ev.desc}</p>
  <div class="meta"><span>📅 ${ev.date}</span><span>🕒 ${ev.time}</span></div>
  <div class="meta" style="margin-top:-8px;"><span>📍 ${ev.venue}</span><span>🎟 ${ev.seats}</span></div>
  ${compact ? '' : `<div class="card-actions">
   <button class="btn ${reg?'btn-ghost':'btn-primary'}" style="flex:1;" onclick="registerEvent('${ev.id}')">${reg ? '✓ Registered' : 'Register'}</button>
  </div>`}
 </div>`;
}
function renderEvents(){
 renderEventFilters();
 const filtered = eventFilter==='All' ? EVENTS : EVENTS.filter(e=>e.cat===eventFilter);
 document.getElementById('eventsGrid').innerHTML = filtered.map(e=>eventCard(e,false)).join('');
 document.getElementById('homeEventsPreview').innerHTML = EVENTS.slice(0,3).map(e=>eventCard(e,true)).join('');
}
function ensureCompleteProfile(){
 if(!CURRENT_USER) return false;
 if(!CURRENT_USER.dept || !CURRENT_USER.year || !CURRENT_USER.phone){
  toast('Please complete your profile with department, year and phone before registering.');
  openModal('profileModal');
  return false;
 }
 return true;
}
async function registerEvent(id){
 if(!requireAuth('register for events.')) return;
 if(!ensureCompleteProfile()) return;
 if(isRegistered(id)) return toast('You are already registered for this event.');
 const ev = EVENTS.find(e=>e.id===id);
 CURRENT_USER.registeredEvents.push(id);
 const msg = 'You are registered for '+ev.title+'. Kindly meet the '+CURRENT_USER.dept+' team tomorrow.';
 CURRENT_USER.notifications.unshift({text:msg, time:'just now'});
 await persistUser();
 renderEvents(); renderDashboard();
 toast(msg);
}

/* ============================================================
   CLUBS
   ============================================================ */
let clubFilter = 'All';
function renderClubFilters(){
 const cats = ['All', ...new Set(CLUBS.map(c=>c.cat))];
 document.getElementById('clubFilters').innerHTML = cats.map(c=>
  `<button class="chip ${c===clubFilter?'active':''}" onclick="setClubFilter('${c}')">${c}</button>`).join('');
}
function setClubFilter(c){ clubFilter=c; renderClubFilters(); renderClubs(); }
function isFav(id){ return CURRENT_USER && CURRENT_USER.favClubs.includes(id); }
function clubEmoji(name){
 const key = name.toLowerCase();
 if(key.includes('google student ambassador') || key.includes('gsat')) return '🚀';
 if(key.includes('coding')) return '💻';
 if(key.includes('robotics') || key.includes('formula student') || key.includes('iot')) return '🤖';
 if(key.includes('dance')) return '💃';
 if(key.includes('music')) return '🎵';
 if(key.includes('photography')) return '📸';
 if(key.includes('literary') || key.includes('debate')) return '📝';
 if(key.includes('entrepreneurship') || key.includes('e-cell')) return '💡';
 if(key.includes('nss')) return '🌱';
 if(key.includes('sports')) return '🏅';
 if(key.includes('yoga') || key.includes('wellness')) return '🧘';
 return '✨';
}
function clubCard(c){
 const fav = isFav(c.id);
 return `<div class="card">
  <div style="width:44px;height:44px;border-radius:12px;background:${c.color};margin-bottom:12px; display:flex; align-items:center; justify-content:center; font-size:1.3rem;">${clubEmoji(c.name)}</div>
  <span class="tag">${c.cat}</span>
  <h3>${c.name}</h3>
  <p>${c.desc}</p>
  <div class="meta"><span>👥 ${c.members} members</span></div>
  <div class="card-actions">
   <button class="icon-btn ${fav?'active':''}" onclick="toggleFav('${c.id}')" title="Save favourite" style="color:${fav?'#fff':'var(--cream)'}">${icon('heart')}</button>
  </div>
 </div>`;
}
function renderClubs(){
 renderClubFilters();
 const filtered = clubFilter==='All' ? CLUBS : CLUBS.filter(c=>c.cat===clubFilter);
 document.getElementById('clubsGrid').innerHTML = filtered.map(clubCard).join('');
}
async function toggleFav(id){
 if(!requireAuth('save favourite clubs.')) return;
 if(!ensureCompleteProfile()) return;
 const c = CLUBS.find(x=>x.id===id);
 const idx = CURRENT_USER.favClubs.indexOf(id);
 if(idx>-1){ CURRENT_USER.favClubs.splice(idx,1); toast('Removed from favourites.'); }
 else{
  CURRENT_USER.favClubs.push(id);
  const msg = 'You are registered with '+c.name+'. Kindly meet the '+CURRENT_USER.dept+' team tomorrow.';
  CURRENT_USER.notifications.unshift({text:msg, time:'just now'});
  toast(msg);
 }
 await persistUser();
 renderClubs(); renderDashboard();
}

/* ============================================================
   FACULTY
   ============================================================ */
let facFilter = 'All';
function renderFacFilters(){
 const depts = ['All', ...new Set(FACULTY.map(f=>f.dept))];
 document.getElementById('facFilters').innerHTML = depts.map(d=>
  `<button class="chip ${d===facFilter?'active':''}" onclick="setFacFilter('${d}')">${d}</button>`).join('');
}
function setFacFilter(d){ facFilter=d; renderFacFilters(); renderFaculty(); }
function renderFaculty(){
 renderFacFilters();
 const filtered = facFilter==='All' ? FACULTY : FACULTY.filter(f=>f.dept===facFilter);
 document.getElementById('facGrid').innerHTML = filtered.map(f=>{
  const initials = f.name.replace('Dr.','').replace('Prof.','').trim().split(' ').map(w=>w[0]).slice(0,2).join('');
  return `<div class="card fac-card">
   <div class="avatar" style="background:conic-gradient(var(--marigold),var(--teal),var(--sky));">${initials}</div>
   <div>
    <h3 style="font-size:1rem;">${f.name}</h3>
    <p style="color:var(--teal); font-size:0.78rem; margin-bottom:6px;">${f.role} · ${f.dept}</p>
    <p style="font-size:0.8rem;">✉️ ${f.email}</p>
    <p style="font-size:0.8rem;">🕒 ${f.hours}</p>
   </div>
  </div>`;
 }).join('');
}

/* ============================================================
   CAMPUS
   ============================================================ */
let campusMap = null;
let campusMarkers = [];
let campusMapLocations = [];
const GOOGLE_MAPS_API_KEY = 'AIzaSyCxvZxiF9fmoLW-KyPpEeqUKqSRWVQlRMc';
const DEFAULT_CAMPUS_CENTER = { lat: 10.756910, lng: 78.651225 };
function pinEmoji(name){
 const key = name.toLowerCase();
 if(key.includes('library')) return '📚';
 if(key.includes('cse')) return '🖥️';
 if(key.includes('auditorium')) return '🎤';
 if(key.includes('sports')) return '🏟️';
 if(key.includes('cafeteria')) return '☕';
 if(key.includes('hostel')) return '🛏️';
 if(key.includes('admin')) return '🏛️';
 if(key.includes('innovation')) return '💡';
 return '📍';
}
function loadGoogleMapsApi(){
 if(window.google && window.google.maps) return Promise.resolve();
 if(!GOOGLE_MAPS_API_KEY){
  updateMapPlaceholder('Set GOOGLE_MAPS_API_KEY in public/app.js and reload to load the map.');
  return Promise.reject(new Error('Google Maps API key not configured'));
 }
 return new Promise((resolve, reject)=>{
  const existing = document.querySelector('script[data-google-maps]');
  if(existing){
   existing.addEventListener('load', ()=>resolve());
   existing.addEventListener('error', ()=>reject(new Error('Failed to load Google Maps')));
   return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
  script.async = true;
  script.defer = true;
  script.dataset.googleMaps = 'true';
  script.onload = ()=>{
   initCampusMap();
   resolve();
  };
  script.onerror = ()=> reject(new Error('Failed to load Google Maps'));
  document.head.appendChild(script);
 });
}
function updateMapPlaceholder(message){
 const canvas = document.getElementById('mapCanvas');
 if(!canvas) return;
 canvas.innerHTML = `<div class="map-placeholder">${message}</div>`;
}
function initCampusMap(){
 const canvas = document.getElementById('mapCanvas');
 if(!canvas || !window.google || !window.google.maps) return;
 const center = campusMapLocations.length ? { lat: campusMapLocations[0].lat, lng: campusMapLocations[0].lng } : DEFAULT_CAMPUS_CENTER;
 campusMap = new google.maps.Map(canvas, {
  center,
  zoom: 17,
  mapTypeId: 'hybrid',
  disableDefaultUI: false,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true
 });
 renderCampusMarkers();
}

function getCampusMarkerIcon(color, emoji){
 const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
 <circle cx="14" cy="14" r="12" fill="${color}" stroke="#ffffff" stroke-width="2" />
 <text x="14" y="18" font-size="14" text-anchor="middle" dominant-baseline="central">${emoji}</text>
</svg>`;
 return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function renderCampusMarkers(){
 if(!campusMap || !window.google || !window.google.maps) return;
 campusMarkers.forEach(marker=>marker.setMap(null));
 campusMarkers = [];
 if(!campusMapLocations.length) return;
 const bounds = new google.maps.LatLngBounds();
 campusMapLocations.forEach(location=>{
  const marker = new google.maps.Marker({
   position:{lat:location.lat, lng:location.lng},
   map:campusMap,
   title:location.name,
   icon: {
    url: getCampusMarkerIcon(location.color || '#ffcc00', location.emoji || pinEmoji(location.name)),
    scaledSize: new google.maps.Size(24, 24),
    anchor: new google.maps.Point(12, 12)
   },
   optimized: false
  });
  marker.addListener('click', ()=> focusCampus(location.id));
  campusMarkers.push(marker);
  bounds.extend(marker.getPosition());
 });
 if(campusMapLocations.length > 1) campusMap.fitBounds(bounds, 80);
}

function setCampusMapLocations(locations){
 campusMapLocations = locations.map(loc=>({ ...loc, emoji: loc.emoji || pinEmoji(loc.name) }));
 renderCampus();
 if(campusMap) renderCampusMarkers();
}
function renderCampus(){
 const canvas = document.getElementById('mapCanvas');
 if(canvas && !campusMap){
  canvas.innerHTML = '<div class="map-placeholder">Google Map will load here once coordinates are provided.</div>';
 }
 const list = campusMapLocations.length ? campusMapLocations : CAMPUS;
 document.getElementById('campusList').innerHTML = list.map(p=>
  `<div class="campus-item" id="ci-${p.id}" onclick="focusCampus('${p.id}')">
   <div class="campus-meta"><span class="campus-pin">${p.emoji || pinEmoji(p.name)}</span><div><h4>${p.name}</h4><p>${p.desc}</p></div></div>
  </div>`).join('');
}
function focusCampus(id){
 document.querySelectorAll('.campus-item').forEach(el=>el.classList.remove('active'));
 const item = document.getElementById('ci-'+id);
 if(item) item.classList.add('active');
 if(item) item.scrollIntoView({behavior:'smooth', block:'nearest'});
 const selected = campusMapLocations.find(loc=>loc.id===id);
 if(selected && campusMap){
  campusMap.panTo({lat:selected.lat, lng:selected.lng});
 }
}

// When you are ready, set GOOGLE_MAPS_API_KEY and call:
// setCampusMapLocations([
//  {id:'p1',name:'Central Library',desc:'...',lat:10.8122,lng:78.7030},
// ]);

/* ============================================================
   RESOURCES
   ============================================================ */
function renderResources(){
 console.log('renderResources called, RESOURCES count=', RESOURCES && RESOURCES.length);
 const grid = document.getElementById('resGrid');
 if(!grid){ console.warn('resGrid element not found'); return; }
 grid.innerHTML = RESOURCES.map(r=>{
   const hasLink = !!r.link;
   const localFile = hasLink && (r.link.startsWith('/') || r.link.startsWith(window.location.origin));
   // Specific behavior per resource id
   const noViewFor = ['r1','r5']; // handbook, scholarship — only download
   const externalOnly = ['r6','r4','r7']; // previous year, faculty, placement — external only

   let viewButton = '';
   let downloadButton = '';
   let externalButton = '';

   if(localFile){
      if(!noViewFor.includes(r.id)){
         viewButton = `<button class="btn btn-primary res-view" onclick="openResourcePreview('${r.id}')">View</button>`;
      }
      downloadButton = `<a href="${r.link}" download class="btn btn-ghost res-download">Download</a>`;
   } else if(hasLink){
      if(externalOnly.includes(r.id)){
         externalButton = `<a href="${r.link}" target="_blank" rel="noreferrer" class="btn btn-primary res-view">Open</a>`;
      } else {
         viewButton = `<a href="${r.link}" target="_blank" rel="noreferrer" class="btn btn-primary res-view">View</a>`;
         downloadButton = `<a href="${r.link}" target="_blank" rel="noreferrer" class="btn btn-ghost res-download">Download</a>`;
      }
   }
   const extraClass = hasLink ? ' res-has-links' : '';
  return `<div class="card res-card${extraClass}">
   <div class="res-icon">${icon(r.icon)}</div>
   <div class="res-meta">
    <h3 style="font-size:0.95rem; margin:0;">${r.name}</h3>
    <p style="font-size:0.78rem; margin:6px 0 0;">${r.size}</p>
    ${r.desc ? `<p class="res-desc">${r.desc}</p>` : ''}
   </div>
   <div class="res-actions">${viewButton}${externalButton}${downloadButton}</div>
  </div>`;
 }).join('');
}

function openResourcePreview(id){
 const resource = RESOURCES.find(r=>r.id===id);
 if(!resource) return;
 const preview = document.getElementById('resourcePreview');
 const previewTitle = document.getElementById('resourcePreviewTitle');
 const previewContent = document.getElementById('resourcePreviewContent');
 const previewLink = document.getElementById('resourcePreviewDownload');
 previewTitle.textContent = resource.name;
 if(resource.link && (resource.link.startsWith('/') || resource.link.startsWith(window.location.origin))){
  const lower = resource.link.toLowerCase();
  if(lower.endsWith('.pdf')){
   previewContent.innerHTML = `<iframe src="${resource.link}" style="width:100%; height:70vh; border:0; border-radius:12px;"></iframe>`;
  } else if(/\.(jpe?g|png|gif|svg)$/.test(lower)){
   previewContent.innerHTML = `<img src="${resource.link}" alt="${resource.name}" style="width:100%; height:auto; border-radius:16px; border:1px solid var(--line);" />`;
  } else {
   previewContent.innerHTML = `<p style="margin:0; color:var(--cream);">Preview not available for this resource.</p>`;
  }
  previewLink.href = resource.link;
  previewLink.style.display = 'inline-flex';
  previewLink.setAttribute('download', '');
 } else if(resource.link){
  previewContent.innerHTML = `<p style="margin:0; color:var(--cream);">This resource opens externally. Use the buttons to view or download.</p>`;
  previewLink.href = resource.link;
  previewLink.style.display = 'inline-flex';
  previewLink.removeAttribute('download');
 } else {
  previewContent.innerHTML = `<p style="margin:0; color:var(--cream);">Preview not available for this resource.</p>`;
  previewLink.style.display = 'none';
 }
 preview.classList.add('open');
}

function closeResourcePreview(){
 document.getElementById('resourcePreview').classList.remove('open');
}

function addReturnHomeButtons(){
 document.querySelectorAll('.page').forEach(page=>{
  if(page.id === 'page-home') return;
  const head = page.querySelector('.section-head');
  if(!head || head.querySelector('.return-home')) return;
  const btn = document.createElement('button');
  btn.className = 'btn btn-ghost return-home';
  btn.textContent = 'Return home';
  btn.addEventListener('click', ()=>navigate('home'));
  head.appendChild(btn);
 });
}

window.addEventListener('load', ()=>{
 loadGoogleMapsApi().catch(()=>{});
 addReturnHomeButtons();
});

// Safety: ensure resources render after full load in case of timing/cache issues
window.addEventListener('load', ()=>{
 try{ renderResources(); }catch(e){ console.error('renderResources fallback failed', e); }
});

/* ============================================================
   AI ASSISTANT
   ============================================================ */
const SUGGESTIONS = [
 'When is the Hackathon?',
 'What clubs are in the Tech category?',
 'Where is the library?',
 'Who is the CSE HoD?',
 'How do I register for an event?',
 'What resources are available?'
];
function renderAssistant(){
 const suggestions = document.getElementById('assistSuggestions');
 const chatLog = document.getElementById('chatLog');
 const geminiStatus = document.getElementById('geminiStatus');
 if(suggestions){
  suggestions.innerHTML = SUGGESTIONS.map(s=>
   `<button class="sugg-btn" onclick="askAssistant('${s.replace(/'/g,"\\'")}')">${s}</button>`).join('');
 }
 if(chatLog && !chatLog.dataset.inited){
  appendMsg('bot', 'Hi! I\'m your Campus Assistant. Gemini is not configured right now, so I\'ll answer from the campus guide locally.');
  chatLog.dataset.inited = '1';
 }
 if(geminiStatus) checkGeminiStatus();
}
async function checkGeminiStatus(){
 const badge = document.getElementById('geminiStatus');
 if(!badge) return;
 try{
  const r = await fetch('/api/assistant/status');
  const data = await r.json();
  if(data.connected){
   badge.innerHTML = '<span class="dot" style="background:var(--teal);"></span><span>Connected to Gemini ('+data.model+')</span>';
  } else {
   badge.innerHTML = '<span class="dot" style="background:var(--marigold);"></span><span>Offline mode: using the campus guide locally</span>';
  }
 }catch(err){
  badge.innerHTML = '<span class="dot" style="background:var(--coral);"></span><span>Offline mode: using the campus guide locally</span>';
 }
}
function appendMsg(who, text){
 const log = document.getElementById('chatLog');
 if(!log) return;
 const el = document.createElement('div');
 el.className = 'msg '+who;
 el.textContent = text;
 log.appendChild(el);
 log.scrollTop = log.scrollHeight;
}
function botReply(query){
 const q = query.toLowerCase();
 if(/hackathon/.test(q)) return 'The GSAT Hackathon 2026 runs on 20 Jul from 9:00 AM in the CSE Labs — 50 teams of 2, tech stack is SQL, GitHub, live hosting and Gemini.';
 if(/hi\b|hello|hey/.test(q)) return 'Hey there! Ask me about events, clubs, faculty, campus spots or resources.';
 if(/library/.test(q)) return 'The Central Library is right next to the Admin Block — four floors, with a 24-hour hall during exams.';
 if(/hostel/.test(q)) return 'Hostel blocks are near the Innovation Center, about five minutes from the academic zone, with separate blocks for men and women.';
 if(/tech club|coding|robotic/.test(q)) return 'Tech clubs include GSAT (Google Student Ambassador Team), Coding Club, Robotics & IoT Society, and Formula Student Racing.';
 if(/club/.test(q)) return 'There are 12 active clubs across Tech, Cultural, Sports, Career and Social categories — check the Clubs page to browse and save favourites.';
 if(/hod|head of department|cse/.test(q)) return 'Dr. R. Kavitha is the Head of the CSE Department — office hours Mon–Fri, 2–4 PM.';
 if(/faculty|professor|teacher/.test(q)) return 'You can browse the full Faculty directory with office hours and emails on the Faculty page.';
 if(/register|sign ?up|enroll/.test(q)) return 'Open any event card and tap Register. If you\'re not signed in yet, I\'ll prompt you to log in — it only takes a few seconds.';
 if(/timetable|schedule/.test(q)) return 'Your personal timetable appears on your Student Dashboard once you\'re logged in.';
 if(/resource|handbook|calendar|syllabus/.test(q)) return 'The Resources page has the Student Handbook, Academic Calendar, Bus Routes, Scholarship Guide and more.';
 if(/event/.test(q)) return 'There are 8 events this orientation week, from the Welcome Party to the Hackathon — check the Events page for dates and venues.';
 if(/bus|transport/.test(q)) return 'Bus routes are listed in the Campus Bus Routes PDF on the Resources page.';
 if(/fee|payment/.test(q)) return 'Fee payments are handled at the Admin Block — bring your admission ID.';
 if(/thank/.test(q)) return 'Happy to help — good luck settling in!';
 return 'I\'m not sure about that one yet, but you can find most answers under Events, Clubs, Faculty, Campus or Resources. Try rephrasing your question?';
}
function askAssistant(text){
 const input = document.getElementById('chatInput');
 if(input){ input.value = text; }
 sendChat();
}
let CHAT_HISTORY = [];
async function sendChat(){
 const input = document.getElementById('chatInput');
 if(!input) return;
 const text = input.value.trim();
 if(!text) return;
 appendMsg('user', text);
 input.value='';
 const log = document.getElementById('chatLog');
 if(!log) return;
 const typing = document.createElement('div');
 typing.className='msg bot typing-wrap';
 typing.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
 log.appendChild(typing); log.scrollTop = log.scrollHeight;

 let reply;
 try{
  const r = await fetch('/api/assistant', {
   method:'POST', headers:{'Content-Type':'application/json'},
   body: JSON.stringify({ message:text, history: CHAT_HISTORY })
  });
  const data = await r.json();
  reply = (data && data.reply) ? data.reply : botReply(text);
 }catch(err){
  reply = botReply(text); // backend unreachable — fall back so the demo never breaks
 }
 typing.remove();
 appendMsg('bot', reply);
 CHAT_HISTORY.push({role:'user', text});
 CHAT_HISTORY.push({role:'bot', text:reply});
 if(CHAT_HISTORY.length > 16) CHAT_HISTORY = CHAT_HISTORY.slice(-16);
}
const chatSend = document.getElementById('chatSend');
if(chatSend) chatSend.addEventListener('click', sendChat);
const chatInput = document.getElementById('chatInput');
if(chatInput) chatInput.addEventListener('keydown', e=>{ if(e.key==='Enter') sendChat(); });

/* ============================================================
   DASHBOARD
   ============================================================ */
const TT_DAYS = ['Mon','Tue','Wed','Thu','Fri'];
const TT_SLOTS = ['9–10','10–11','11–12','1–2','2–3'];
function generateTimetable(dept){
 const subjectsByDept = {
  CSE:['Data Structures','Algorithms','DBMS','OS','AI/ML Lab'],
  IT:['Networks','Web Tech','DBMS','OS','Cloud Lab'],
  ECE:['Signals','Circuits','EM Theory','Digital Systems','VLSI Lab'],
  EEE:['Power Systems','Machines','Control Systems','Electronics','Circuits Lab'],
  Mech:['Thermodynamics','Fluid Mechanics','Design','Manufacturing','CAD Lab'],
  Civil:['Structures','Surveying','Concrete Tech','Geotech','Drawing Lab'],
  AIML:['Machine Learning','Deep Learning','Statistics','NLP','AI Lab']
 };
 const subs = subjectsByDept[dept] || subjectsByDept.CSE;
 let rows = '<tr><th>Time</th>'+TT_DAYS.map(d=>`<th>${d}</th>`).join('')+'</tr>';
 TT_SLOTS.forEach((slot,i)=>{
  rows += '<tr><td>'+slot+'</td>' + TT_DAYS.map((d,j)=>'<td>'+subs[(i+j)%subs.length]+'</td>').join('') + '</tr>';
 });
 return rows;
}
function renderDashboard(){
 if(!CURRENT_USER) return;
 document.getElementById('dashAvatar').textContent = CURRENT_USER.name.trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
 document.getElementById('dashName').textContent = CURRENT_USER.name;
 document.getElementById('dashMeta').textContent = CURRENT_USER.dept+' · '+CURRENT_USER.year;

 const notifs = CURRENT_USER.notifications || [];
 document.getElementById('dashNotifs').innerHTML = notifs.length ? notifs.slice(0,6).map(n=>
  `<div class="notif-item"><div class="notif-dot"></div><div>${n.text}<div style="color:var(--cream-dim); font-size:0.72rem; margin-top:2px;">${n.time}</div></div></div>`).join('')
  : `<div class="empty-state">No notifications yet.</div>`;

 const regEvents = EVENTS.filter(e=>CURRENT_USER.registeredEvents.includes(e.id));
 document.getElementById('dashEvents').innerHTML = regEvents.length ? regEvents.map(e=>
  `<div class="notif-item"><div class="notif-dot" style="background:var(--teal);"></div><div><b>${e.title}</b><div style="color:var(--cream-dim); font-size:0.78rem;">${e.date} · ${e.venue}</div></div></div>`).join('')
  : `<div class="empty-state">No events yet — browse the Events page and register.</div>`;

 const favClubs = CLUBS.filter(c=>CURRENT_USER.favClubs.includes(c.id));
 document.getElementById('dashClubs').innerHTML = favClubs.length ? favClubs.map(c=>
  `<div class="notif-item"><div class="notif-dot" style="background:var(--coral);"></div><div><b>${c.name}</b><div style="color:var(--cream-dim); font-size:0.78rem;">${c.members} members</div></div></div>`).join('')
  : `<div class="empty-state">No favourites yet — tap ♥ on any club you like.</div>`;

 document.getElementById('ttTable').innerHTML = generateTimetable(CURRENT_USER.dept);
}

/* ============================================================
   SEARCH
   ============================================================ */
function buildSearchIndex(){
 const idx = [];
 EVENTS.forEach(e=>idx.push({cat:'Event', label:e.title, page:'events'}));
 CLUBS.forEach(c=>idx.push({cat:'Club', label:c.name, page:'clubs'}));
 FACULTY.forEach(f=>idx.push({cat:'Faculty', label:f.name+' — '+f.dept, page:'faculty'}));
 CAMPUS.forEach(p=>idx.push({cat:'Campus', label:p.name, page:'campus', focus:p.id}));
 RESOURCES.forEach(r=>idx.push({cat:'Resource', label:r.name, page:'resources'}));
 return idx;
}
const SEARCH_INDEX = buildSearchIndex();
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
searchInput.addEventListener('input', ()=>{
 const q = searchInput.value.trim().toLowerCase();
 if(!q){ searchResults.style.display='none'; return; }
 const matches = SEARCH_INDEX.filter(item=>item.label.toLowerCase().includes(q)).slice(0,8);
 if(!matches.length){ searchResults.innerHTML = '<div class="sr-item">No matches. Try Events, Clubs, Faculty or Resources.</div>'; searchResults.style.display='block'; return; }
 searchResults.innerHTML = matches.map(m=>
  `<div class="sr-item" onclick="goSearchResult('${m.page}','${m.focus||''}')"><div class="sr-cat">${m.cat}</div>${m.label}</div>`).join('');
 searchResults.style.display='block';
});
function goSearchResult(page, focus){
 navigate(page);
 searchInput.value=''; searchResults.style.display='none';
 if(page==='campus' && focus) setTimeout(()=>focusCampus(focus), 300);
}
document.addEventListener('click', e=>{
 if(!e.target.closest('.search-wrap')) searchResults.style.display='none';
});

/* ============================================================
   LANGUAGE
   ============================================================ */
document.getElementById('langSelect').addEventListener('change', e=>{
 currentLang = e.target.value;
 applyI18n();
 switchAuthTab(authMode);
 onAuthChanged();
});

/* ============================================================
   COMPASS NODES (hero)
   ============================================================ */
function renderCompass(){
  // Hero orbit system is rendered directly in HTML; no JS injection needed.
}

/* ============================================================
   COUNTERS
   ============================================================ */
function animateCounters(){
 document.querySelectorAll('.counter').forEach(el=>{
  const target = parseInt(el.dataset.target,10);
  let cur = 0;
  const step = Math.max(1, Math.round(target/40));
  const t = setInterval(()=>{
   cur += step;
   if(cur>=target){ cur=target; clearInterval(t); }
   el.textContent = cur;
  }, 30);
 });
}

/* ============================================================
   THEME MANAGEMENT
   ============================================================ */
function initTheme(){
 const savedTheme = localStorage.getItem('compass-theme') || 'dark';
 const html = document.documentElement;
 if(savedTheme === 'light'){
  html.setAttribute('data-theme', 'light');
  document.getElementById('themeToggle').textContent = '☀️';
 } else {
  html.removeAttribute('data-theme');
  document.getElementById('themeToggle').textContent = '🌙';
 }
}

function toggleTheme(){
 const html = document.documentElement;
 const currentTheme = html.getAttribute('data-theme') || 'dark';
 const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
 if(newTheme === 'light'){
  html.setAttribute('data-theme', 'light');
  document.getElementById('themeToggle').textContent = '☀️';
 } else {
  html.removeAttribute('data-theme');
  document.getElementById('themeToggle').textContent = '🌙';
 }
 localStorage.setItem('compass-theme', newTheme);
}

/* ============================================================
   INIT
   ============================================================ */
async function init(){
 initTheme();
 renderCompass();
 renderEvents();
 renderClubs();
 renderFaculty();
 setCampusMapLocations(CAMPUS);
 renderResources();
 renderAssistant();
 applyI18n();
 await restoreSession();
 onAuthChanged();
 setTimeout(animateCounters, 300);
 document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}
init();
document.addEventListener("DOMContentLoaded", function () {
  const monthYearLabel = document.getElementById("calendar-month-year");
  const daysContainer = document.getElementById("calendar-days-container");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  // Track the current displayed date context
  let currentDate = new Date();
  
  // Real absolute today's date context to pinpoint the highlighting
  const today = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update the Header Label text
    monthYearLabel.textContent = `${months[month]} ${year}`;

    // Clear previous numbers completely
    daysContainer.innerHTML = "";

    // Find what weekday the 1st of the month falls on
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Find how many total days are in the current month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // 1. Render blank/empty spaces before the first day of month
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("day", "empty");
      daysContainer.appendChild(emptyDiv);
    }

    // 2. Render all the actual calendar numerical days
    for (let day = 1; day <= totalDays; day++) {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      dayDiv.textContent = day;

      // Check if this date loop matches today's exact real date
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      // Hardcoded sample event indicator (e.g., matching July 20, 2026)
      if (day === 20 && month === 6 && year === 2026) {
        dayDiv.classList.add("event-day");
      }

      daysContainer.appendChild(dayDiv);
    }
  }

  // Event Listeners for switching months dynamically
  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Run generation logic instantly on page load
  renderCalendar();
});