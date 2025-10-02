import { useState, useEffect } from 'react';
import { initDatabase, getAllUsers, getAllCars, type User, type Car } from '../utils/database';

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        setIsInitialized(true);
        loadData();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize database');
      }
    };

    init();
  }, []);

  const loadData = () => {
    try {
      setUsers(getAllUsers());
      setCars(getAllCars());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    }
  };

  return {
    isInitialized,
    users,
    cars,
    error,
    refreshData: loadData,
  };
}
