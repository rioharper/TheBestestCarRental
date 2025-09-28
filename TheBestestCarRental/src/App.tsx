import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import './App.css'

interface User {
  email: string;
  name: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (userData: User) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App
