import initSqlJs, { type Database } from 'sql.js';

let db: Database | null = null;
const DB_STORAGE_KEY = 'carRentalDatabase';

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

// Save database to localStorage
function saveDatabase(): void {
  if (!db) return;
  
  try {
    const data = db.export();
    const buffer = Array.from(data);
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(buffer));
  } catch (error) {
    console.error('Error saving database to localStorage:', error);
  }
}

// Load database from localStorage
function loadDatabaseFromStorage(SQL: any): Database | null {
  try {
    const stored = localStorage.getItem(DB_STORAGE_KEY);
    if (stored) {
      const buffer = new Uint8Array(JSON.parse(stored));
      const loadedDb = new SQL.Database(buffer);
      return loadedDb;
    }
  } catch (error) {
    console.error('Error loading database from localStorage:', error);
  }
  return null;
}

export async function initDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`
  });

  // First, try to load from localStorage (persisted data)
  db = loadDatabaseFromStorage(SQL);
  
  if (db) {
    return db;
  }

  // If not in localStorage, try to load the initial database file
  try {
    const response = await fetch('/datebase.db');
      const buffer = await response.arrayBuffer();
      db = new SQL.Database(new Uint8Array(buffer));
      saveDatabase();
      
  } catch (error) {
    console.error('Error loading database:', error);
    // Fallback to creating a new database
    db = new SQL.Database();
    saveDatabase();
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

export function isAdmin(userId: number): boolean {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM admins WHERE userID = ?', [userId]);
  return result.length > 0 && result[0].values.length > 0;
}

export function isAdminByEmail(email: string): boolean {
  const db = getDatabase();
  const result = db.exec(`
    SELECT admins.userID 
    FROM admins 
    INNER JOIN users ON admins.userID = users.id 
    WHERE users.email = ?
  `, [email]);
  return result.length > 0 && result[0].values.length > 0;
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
  
  // Save database to localStorage after creating user
  saveDatabase();
  
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

// Add a new car
export function addCar(car: {
  year: number;
  size: string;
  make: string;
  model: string;
  availability: number;
  seats: number;
  price: number;
  imageUrl: string;
  color: string;
}): void {
  const db = getDatabase();
  db.run(
    'INSERT INTO cars (year, size, make, model, availability, seats, price, image, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [car.year, car.size, car.make, car.model, car.availability, car.seats, car.price, car.imageUrl, car.color]
  );
  saveDatabase();
}

// Update an existing car by id
export function updateCar(id: number, car: {
  year: number;
  size: string;
  make: string;
  model: string;
  availability: number;
  seats: number;
  price: number;
  imageUrl: string;
  color: string;
}): void {
  const db = getDatabase();
  db.run(
    'UPDATE cars SET year = ?, size = ?, make = ?, model = ?, availability = ?, seats = ?, price = ?, image = ?, color = ? WHERE id = ?',
    [car.year, car.size, car.make, car.model, car.availability, car.seats, car.price, car.imageUrl, car.color, id]
  );
  saveDatabase();
}

// Reservation operations
export interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  status: number;
  carId: number;
}

export function getAllReservations(): Reservation[] {
  const db = getDatabase();
  const result = db.exec('SELECT * FROM reservations');
  if (result.length === 0) return [];
  return result[0].values.map(row => ({
    id: row[0] as number,
    startDate: row[1] as string,
    endDate: row[2] as string,
    status: row[3] as number,
    carId: row[4] as number,
  }));
}

// Add a new reservation
export function addReservation(res: {
  startDate: string;
  endDate: string;
  status: number;
  carId: number;
}): void {
  const db = getDatabase();
  db.run(
    'INSERT INTO reservations (startDate, endDate, status, carId) VALUES (?, ?, ?, ?)',
    [res.startDate, res.endDate, res.status, res.carId]
  );
  saveDatabase();
}
