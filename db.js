// db.js — storage layer for student accounts.
// Tries Node's built-in SQLite module first (real SQL database, matches the
// hackathon's "SQL for database management" requirement). If the Node
// version running this doesn't have node:sqlite yet, it falls back
// automatically to a JSON file so the app still works everywhere.

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

let impl;

try {
  // Ensure the data directory is writable on the current platform. Many
  // serverless hosts (Vercel, Netlify) mount the repo as read-only at
  // runtime; attempting to open a SQLite file there will fail. Test write
  // access first and if it fails, fall back to the JSON file implementation.
  try {
    const testFile = path.join(DATA_DIR, '.write_test');
    fs.writeFileSync(testFile, 'ok');
    fs.unlinkSync(testFile);
  } catch (writeErr) {
    throw new Error('data dir not writable: ' + writeErr.message);
  }

  const { DatabaseSync } = require('node:sqlite');
  const db = new DatabaseSync(path.join(DATA_DIR, 'compass.db'));

  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      dept TEXT DEFAULT 'CSE',
      year TEXT DEFAULT '1st Year',
      phone TEXT DEFAULT '',
      registeredEvents TEXT DEFAULT '[]',
      favClubs TEXT DEFAULT '[]',
      notifications TEXT DEFAULT '[]'
    )
  `);

  const rowToStudent = (row) => row && ({
    email: row.email,
    name: row.name,
    password: row.password,
    dept: row.dept,
    year: row.year,
    phone: row.phone,
    registeredEvents: JSON.parse(row.registeredEvents),
    favClubs: JSON.parse(row.favClubs),
    notifications: JSON.parse(row.notifications)
  });

  impl = {
    mode: 'sqlite',
    async getStudent(email) {
      const row = db.prepare('SELECT * FROM students WHERE email = ?').get(email);
      return rowToStudent(row);
    },
    async createStudent(student) {
      db.prepare(`
        INSERT INTO students (email, name, password, dept, year, phone, registeredEvents, favClubs, notifications)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        student.email, student.name, student.password, student.dept, student.year, student.phone,
        JSON.stringify(student.registeredEvents), JSON.stringify(student.favClubs), JSON.stringify(student.notifications)
      );
      return this.getStudent(student.email);
    },
    async updateStudent(email, patch) {
      const existing = await this.getStudent(email);
      if (!existing) return null;
      const merged = { ...existing, ...patch };
      db.prepare(`
        UPDATE students SET name=?, dept=?, year=?, phone=?, registeredEvents=?, favClubs=?, notifications=?
        WHERE email=?
      `).run(
        merged.name, merged.dept, merged.year, merged.phone,
        JSON.stringify(merged.registeredEvents), JSON.stringify(merged.favClubs), JSON.stringify(merged.notifications),
        email
      );
      return this.getStudent(email);
    }
  };

  console.log('[db] Using built-in SQLite (node:sqlite) — data/compass.db');
} catch (err) {
  // If the error indicates the data directory isn't writable, fall back
  // to an in-memory store so the app still functions on read-only
  // deployment targets (data won't persist across restarts).
  if (err && typeof err.message === 'string' && err.message.startsWith('data dir not writable')) {
    const mem = {};
    impl = {
      mode: 'memory',
      async getStudent(email) { return mem[email] || null; },
      async createStudent(student) { mem[student.email] = student; return student; },
      async updateStudent(email, patch) { if (!mem[email]) return null; mem[email] = { ...mem[email], ...patch }; return mem[email]; }
    };
    console.log('[db] Data directory not writable — using in-memory store (non-persistent)');
  } else {
    // Fallback: flat JSON file on disk.
    const FILE = path.join(DATA_DIR, 'students.json');
    if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '{}');

    const readAll = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
    const writeAll = (obj) => fs.writeFileSync(FILE, JSON.stringify(obj, null, 2));

    impl = {
      mode: 'json',
      async getStudent(email) {
        const all = readAll();
        return all[email] || null;
      },
      async createStudent(student) {
        const all = readAll();
        all[student.email] = student;
        writeAll(all);
        return student;
      },
      async updateStudent(email, patch) {
        const all = readAll();
        if (!all[email]) return null;
        all[email] = { ...all[email], ...patch };
        writeAll(all);
        return all[email];
      }
    };

    console.log('[db] node:sqlite unavailable on this Node version — using data/students.json instead');
  }
}

module.exports = impl;
