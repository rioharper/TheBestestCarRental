import initSqlJs, { type Database } from 'sql.js';

let db: Database | null = null;

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  available: boolean;
}

export async function initDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`
  });

  db = new SQL.Database();

  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `);

  // Create cars table
  db.run(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      pricePerDay REAL NOT NULL,
      available INTEGER DEFAULT 1
    )
  `);

  // Insert example user
  db.run(`
    INSERT OR IGNORE INTO users (id, email, password, name) 
    VALUES (1, 'demo@example.com', 'password123', 'Demo User')
  `);

  // Insert example car
  db.run(`
    INSERT OR IGNORE INTO cars (id, make, model, year, pricePerDay, available) 
    VALUES (1, 'Toyota', 'Camry', 2023, 45.99, 1)
  `);

  return db;
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

// User operations
export function getAllUsers(): User[] {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM users');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as number,
    email: row[1] as string,
    password: row[2] as string,
    name: row[3] as string,
  }));
}

export function getUserByEmail(email: string): User | null {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM users WHERE email = ?', [email]);
  if (result.length === 0 || result[0].values.length === 0) return null;
  
  const row = result[0].values[0];
  return {
    id: row[0] as number,
    email: row[1] as string,
    password: row[2] as string,
    name: row[3] as string,
  };
}

export function authenticateUser(email: string, password: string): User | null {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  if (result.length === 0 || result[0].values.length === 0) return null;
  
  const row = result[0].values[0];
  return {
    id: row[0] as number,
    email: row[1] as string,
    password: row[2] as string,
    name: row[3] as string,
  };
}

// Car operations
export function getAllCars(): Car[] {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM cars');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as number,
    make: row[1] as string,
    model: row[2] as string,
    year: row[3] as number,
    pricePerDay: row[4] as number,
    available: row[5] === 1,
  }));
}

export function getAvailableCars(): Car[] {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM cars WHERE available = 1');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as number,
    make: row[1] as string,
    model: row[2] as string,
    year: row[3] as number,
    pricePerDay: row[4] as number,
    available: row[5] === 1,
  }));
}
