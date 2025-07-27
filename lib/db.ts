import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

let dbPromise: Promise<Database> | null = null;

export function getDb() {
  if (!dbPromise) {
    const dbPath = path.join(process.cwd(), "registrations.db");
    dbPromise = open({ filename: dbPath, driver: sqlite3.Database }).then(
      async (db) => {
        await db.exec(`
        CREATE TABLE IF NOT EXISTS registrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
        return db;
      },
    );
  }
  return dbPromise;
}

export async function saveRegistration(data: any) {
  const db = await getDb();
  const result = await db.run(
    "INSERT INTO registrations (data) VALUES (?)",
    JSON.stringify(data),
  );
  return result.lastID;
}
