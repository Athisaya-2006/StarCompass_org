// data.js — the campus dataset the AI Assistant is grounded in.
// Mirrors the dummy data rendered on the frontend (public/app.js) so the
// assistant's answers stay consistent with what's shown on the pages.

const EVENTS = [
 {id:'e1', title:"Freshers' Welcome Party", cat:'Social', date:'20 Jul 2026', time:'6:00 PM', venue:'Main Auditorium', seats:'420 / 500', desc:"Kick off orientation week with music, games and a campus-wide welcome from every club."},
 {id:'e2', title:'GSAT Hackathon 2026', cat:'Tech', date:'20 Jul 2026', time:'9:00 AM', venue:'CSE Labs', seats:'50 teams', desc:'Build an AI-powered freshers portal in a day — the very challenge this site answers.'},
 {id:'e3', title:'Orientation Session', cat:'Academic', date:'17 Jul 2026', time:'10:00 AM', venue:'Seminar Hall 1', seats:'Open', desc:"Meet your HoDs, understand the curriculum, and get your ID cards."},
 {id:'e4', title:'Tech Talk: Prompt Engineering', cat:'Tech', date:'22 Jul 2026', time:'3:30 PM', venue:'Innovation Center', seats:'180 / 200', desc:'A hands-on session on getting the most out of Gemini and other LLMs.'},
 {id:'e5', title:'Cultural Night — Rangoli', cat:'Cultural', date:'23 Jul 2026', time:'7:00 PM', venue:'Open Air Theatre', seats:'Unlimited', desc:'Dance, music and drama from every department, capped with a fireworks finale.'},
 {id:'e6', title:'Inter-Dept Sports Meet', cat:'Sports', date:'25 Jul 2026', time:'8:00 AM', venue:'Sports Complex', seats:'Team entry', desc:'Cricket, football and athletics — represent your department on day one.'},
 {id:'e7', title:'Resume & LinkedIn Workshop', cat:'Career', date:'27 Jul 2026', time:'2:00 PM', venue:'Placement Cell', seats:'150 / 150', desc:'Placement cell mentors help you build a resume that survives the first filter.'},
 {id:'e8', title:'Club Expo', cat:'Social', date:'21 Jul 2026', time:'11:00 AM', venue:'Central Quad', seats:'Walk-in', desc:'Every club sets up a stall — the fastest way to find where you belong.'}
];

const CLUBS = [
 {id:'c1', name:'GSAT — Google Student Ambassador Team', cat:'Tech', members:64, desc:'Runs Google DevFest, study jams and this very hackathon.'},
 {id:'c2', name:'Coding Club', cat:'Tech', members:210, desc:'Weekly contests, DSA sheets and peer-led workshops.'},
 {id:'c3', name:'Robotics & IoT Society', cat:'Tech', members:88, desc:'Builds line-followers, drones and campus automation projects.'},
 {id:'c4', name:'Dance Crew — Rhythm', cat:'Cultural', members:74, desc:'Classical and freestyle — auditions every August.'},
 {id:'c5', name:'Music Club — Echoes', cat:'Cultural', members:59, desc:'Jam sessions every Friday, open mic every month.'},
 {id:'c6', name:'Photography Club — Frame', cat:'Cultural', members:47, desc:'Covers every campus event; runs an annual exhibition.'},
 {id:'c7', name:'Literary & Debate Society', cat:'Academic', members:65, desc:'Quizzing, debating and a termly campus magazine.'},
 {id:'c8', name:'E-Cell — Entrepreneurship Cell', cat:'Career', members:52, desc:'Pitch nights, startup mentoring and a seed-fund challenge.'},
 {id:'c9', name:'NSS — National Service Scheme', cat:'Social', members:130, desc:'Village outreach camps and blood donation drives.'},
 {id:'c10', name:'Sports Club', cat:'Sports', members:190, desc:'Trials for cricket, football, badminton and athletics.'},
 {id:'c11', name:'Yoga & Wellness Circle', cat:'Social', members:38, desc:'Early-morning sessions, three days a week.'},
 {id:'c12', name:'Robotics Racing — Formula Student', cat:'Tech', members:41, desc:'Designs and races a student formula car every year.'}
];

const FACULTY = [
 {id:'f1', name:'Dr. R. Kavitha', dept:'CSE', role:'Head of Department', email:'kavitha.cse@saranathan.ac.in', hours:'Mon–Fri, 2–4 PM'},
 {id:'f2', name:'Dr. S. Vignesh', dept:'CSE', role:'AI & ML Coordinator', email:'vignesh.cse@saranathan.ac.in', hours:'Tue & Thu, 10–12 PM'},
 {id:'f3', name:'Prof. Meera Balan', dept:'ECE', role:'Assistant Professor', email:'meera.ece@saranathan.ac.in', hours:'Mon–Wed, 1–3 PM'},
 {id:'f4', name:'Dr. A. Prakash', dept:'Mechanical', role:'Head of Department', email:'prakash.mech@saranathan.ac.in', hours:'Fri, 11–1 PM'},
 {id:'f5', name:'Prof. Lakshmi Narayanan', dept:'IT', role:'Placement Coordinator', email:'lakshmi.it@saranathan.ac.in', hours:'Daily, 3–5 PM'},
 {id:'f6', name:'Dr. J. Selvam', dept:'Civil', role:'Associate Professor', email:'selvam.civil@saranathan.ac.in', hours:'Mon & Wed, 9–11 AM'},
 {id:'f7', name:'Dr. Priya Anand', dept:'EEE', role:'Head of Department', email:'priya.eee@saranathan.ac.in', hours:'Tue & Fri, 2–4 PM'},
 {id:'f8', name:'Prof. Karthik Raja', dept:'AIML', role:'Lab In-charge', email:'karthik.aiml@saranathan.ac.in', hours:'Mon–Fri, 10–11 AM'}
];

const CAMPUS = [
 {id:'p1', name:'Central Library', desc:'Four floors, 24-hour reading hall during exams, and a digital archive terminal on the ground floor.'},
 {id:'p2', name:'CSE Labs Block', desc:'Where the hackathon runs — six labs, GPU workstations, and the departmental server room.'},
 {id:'p3', name:'Main Auditorium', desc:'900-seat venue for orientation, cultural nights and guest lectures.'},
 {id:'p4', name:'Sports Complex', desc:'Cricket ground, football turf, indoor badminton courts and a gym.'},
 {id:'p5', name:'Cafeteria', desc:'Open 7 AM – 9 PM; the unofficial meeting point between classes.'},
 {id:'p6', name:'Hostel Blocks', desc:"Separate blocks for men and women, five minutes from the academic zone."},
 {id:'p7', name:'Admin Block', desc:"Fee payments, ID cards, bonafide certificates and the registrar's office."},
 {id:'p8', name:'Innovation Center', desc:'Incubation space for E-Cell startups and GSAT project demos.'}
];

const RESOURCES = [
 {id:'r1', name:'Student Handbook 2026', desc:'Rules, grading system, and code of conduct.'},
 {id:'r2', name:'Academic Calendar', desc:'Term dates, exam windows, holidays.'},
 {id:'r3', name:'Campus Bus Routes', desc:'All pickup points and timings.'},
 {id:'r4', name:'Scholarship Guide', desc:'Eligibility and how to apply.'},
 {id:'r5', name:'Previous Year Question Papers', desc:'Archive by department and semester.'},
 {id:'r6', name:'Placement Prep Guide', desc:'Resume, aptitude and interview prep.'}
];

module.exports = { EVENTS, CLUBS, FACULTY, CAMPUS, RESOURCES };
