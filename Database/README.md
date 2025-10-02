# SQLite Database Implementation

This project uses **sql.js** to implement an in-memory SQLite database for the car rental application.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL
)
```

### Cars Table
```sql
CREATE TABLE cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  pricePerDay REAL NOT NULL,
  available INTEGER DEFAULT 1
)
```

## Example Data

### Example User
- **Email:** demo@example.com
- **Password:** password123
- **Name:** Demo User

### Example Car
- **Make:** Toyota
- **Model:** Camry
- **Year:** 2023
- **Price Per Day:** $45.99
- **Available:** Yes

## Usage

The database is automatically initialized when the app starts. You can use the `useDatabase` hook in any component:

```typescript
import { useDatabase } from './hooks/useDatabase';

function MyComponent() {
  const { isInitialized, users, cars, error, refreshData } = useDatabase();
  
  // Your component logic here
}
```

## Database Functions

Located in `src/utils/database.ts`:

- `initDatabase()` - Initialize the database
- `getAllUsers()` - Get all users
- `getUserByEmail(email)` - Get user by email
- `getAllCars()` - Get all cars
- `getAvailableCars()` - Get only available cars

## Note

This is an in-memory database, so all data is reset when the page refreshes. For production, you would need to implement data persistence using browser storage or a backend server.
