import React, { useState, useEffect } from 'react';
import './LoginScreen.css';
import { initDatabase, authenticateUser } from '../utils/database';

interface LoginScreenProps {
  onLogin: (user: { email: string; name: string }) => void;
  onBack?: () => void;
  onSignUpClick?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        setDbInitialized(true);
      } catch (err) {
        setError('Failed to initialize database');
        console.error('Database initialization error:', err);
      }
    };
    init();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!dbInitialized) {
        setError('Database not ready. Please wait...');
        setLoading(false);
        return;
      }

      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Authenticate user against the database
      const user = authenticateUser(email, password);
      
      if (user) {
        // Login successful
        onLogin({
          email: user.email,
          name: user.name
        });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };



  const handleCreateAccount = () => {
    if (onSignUpClick) {
      onSignUpClick();
    } else {
      alert('Registration page will be implemented next!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="logo-text">THE BESTEST</span>
        </div>

        <form onSubmit={handleEmailLogin} className="login-form">
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required={isSignUp}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        {!isSignUp && (
          <div className="new-user-section">
            <p>New here? <button type="button" className="create-account-btn" onClick={handleCreateAccount}>Create an account</button></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;