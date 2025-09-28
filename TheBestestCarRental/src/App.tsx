import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import LandingPage from './components/LandingPage'
import './App.css'

interface User {
  email: string;
  name: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [showLogin, setShowLogin] = useState(false)

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowLogin(false);
    console.log('User logged in:', userData);
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(false);
    console.log('User logged out');
  };

  const handleSignInClick = () => {
    setShowLogin(true);
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
  };

  if (showLogin && !user) {
    return <LoginScreen onLogin={handleLogin} onBack={handleBackToLanding} />;
  }

  if (!user) {
    return <LandingPage onSignInClick={handleSignInClick} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App
