import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import LandingPage from './components/LandingPage'
import SignUpScreen from './components/SignUpScreen'


import './App.css'

interface User {
  email: string;
  name: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const handleLogin = (userData: User) => {
    setUser(userData);
    setShowLogin(false);
    setShowSignUp(false);
    console.log('User logged in:', userData);
  };

  const handleSignUp = (userData: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    driversLicense: string;
  }) => {
    const user = {
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`
    };
    setUser(user);
    setShowSignUp(false);
    setShowLogin(false);
    console.log('User signed up:', userData);
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(false);
    setShowSignUp(false);
    console.log('User logged out');
  };

  const handleSignInClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  if (showSignUp && !user) {
    return <SignUpScreen onSignUp={handleSignUp} onBack={handleBackToLanding} onSignIn={handleSignInClick} />;
  }

  if (showLogin && !user) {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        onBack={handleBackToLanding} 
        onSignUpClick={handleSignUpClick} 
      />
    );
  }

  // Always show LandingPage, whether logged in or not
  return <LandingPage onSignInClick={handleSignInClick} user={user} onLogout={handleLogout} />;
}

export default App
