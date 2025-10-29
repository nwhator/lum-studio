import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

// Ensure the db directory exists at project root
const DB_DIR = path.join(process.cwd(), "db");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_FILE = path.join(DB_DIR, "bookings.sqlite");

// Open (or create) the SQLite database. better-sqlite3 is synchronous and
// well suited for lightweight server-side usage in Next.js route handlers.
const db = new Database(DB_FILE);

// Use WAL for better concurrency when supported
try {
  db.pragma("journal_mode = WAL");
} catch (e) {
  // ignore on environments that don't support it
}

// Create the bookings table if it doesn't exist. Includes fields for contact and payment info.
db.prepare(
  `CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    time_slots TEXT DEFAULT '[]',
    package TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    notes TEXT,
    payment_account_name TEXT,
    payment_bank_name TEXT,
    payment_transaction_id TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );`
).run();

// Migration: ensure older installs get the new columns if missing.
try {
  const cols = db.prepare("PRAGMA table_info(bookings)").all() as Array<{ name: string }>;
  const colNames = cols.map((c) => c.name);
  const addIfMissing = (col: string, ddl: string) => {
    if (!colNames.includes(col)) {
      db.prepare(ddl).run();
    }
  };

  addIfMissing("time_slots", "ALTER TABLE bookings ADD COLUMN time_slots TEXT DEFAULT '[]'");
  addIfMissing("package", "ALTER TABLE bookings ADD COLUMN package TEXT");
  addIfMissing("email", "ALTER TABLE bookings ADD COLUMN email TEXT");
  addIfMissing("notes", "ALTER TABLE bookings ADD COLUMN notes TEXT");
  addIfMissing("payment_account_name", "ALTER TABLE bookings ADD COLUMN payment_account_name TEXT");
  addIfMissing("payment_bank_name", "ALTER TABLE bookings ADD COLUMN payment_bank_name TEXT");
  addIfMissing("payment_transaction_id", "ALTER TABLE bookings ADD COLUMN payment_transaction_id TEXT");
  addIfMissing("status", "ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'confirmed'");
} catch (e) {
  // If PRAGMA fails, ignore — migration not critical
  console.warn("DB migration check failed:", e);
}

export default db;
