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
  price: number;
  available: boolean;
  size: string;
  color: string;
  seats: number;
  imageUrl: string;
}

export async function initDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`
  });

  // Load the existing database file
  try {
    const response = await fetch('/datebase.db');
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      db = new SQL.Database(new Uint8Array(buffer));
      console.log('Database loaded from datebase.db');
    } else {
      console.warn('Could not load datebase.db, creating new database');
      db = new SQL.Database();
      
      // Create tables only if we couldn't load the existing database
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT NOT NULL
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS cars (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          make TEXT NOT NULL,
          model TEXT NOT NULL,
          year INTEGER NOT NULL,
          pricePerDay REAL NOT NULL,
          available INTEGER DEFAULT 1,
          size TEXT NOT NULL,
          color TEXT NOT NULL,
          seats INTEGER NOT NULL,
          imageUrl TEXT NOT NULL
        )
      `);

      // Insert example data
      db.run(`
        INSERT OR IGNORE INTO users (id, email, password, name) 
        VALUES (1, 'demo@example.com', 'password123', 'Demo User')
      `);

      db.run(`
        INSERT OR IGNORE INTO cars (id, make, model, year, pricePerDay, available, size, color, seats, imageUrl) 
        VALUES 
        (1, 'Toyota', 'Camry', 2023, 45.99, 1, 'Sedan', 'silver', 5, 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500'),
        (2, 'Honda', 'CR-V', 2024, 65.00, 1, 'SUV', 'black', 5, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500'),
        (3, 'Ford', 'F-150', 2023, 85.00, 1, 'Truck', 'blue', 5, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500'),
        (4, 'BMW', '3 Series', 2024, 120.00, 1, 'Luxury', 'white', 5, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500'),
        (5, 'Chevrolet', 'Suburban', 2023, 95.00, 1, 'SUV', 'red', 7, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500'),
        (6, 'Nissan', 'Altima', 2023, 42.00, 1, 'Sedan', 'white', 5, 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=500')
      `);
    }
  } catch (error) {
    console.error('Error loading database:', error);
    // Fallback to creating a new database
    db = new SQL.Database();
  }

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

export function createUser(email: string, password: string, name: string): User | null {
  const db = getDatabase();
  
  // Check if user already exists
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Insert new user
  db.run('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, password, name]);
  
  // Return the newly created user
  return getUserByEmail(email);
}

// Car operations
export function getAllCars(): Car[] {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM cars');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as number,
    make: row[3] as string,
    model: row[4] as string,
    year: row[1] as number,
    price: row[7] as number,
    available: row[5] === 1,
    size: row[2] as string,
    color: row[9] as string,
    seats: row[6] as number,
    imageUrl: row[8] as string,
  }));
}

export function getAvailableCars(): Car[] {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM cars WHERE available = 1');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as number,
    make: row[3] as string,
    model: row[4] as string,
    year: row[1] as number,
    price: row[7] as number,
    available: row[5] === 1,
    size: row[2] as string,
    color: row[9] as string,
    seats: row[6] as number,
    imageUrl: row[8] as string,
  }));
}
