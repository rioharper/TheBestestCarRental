import React, { useState } from 'react';
import './LoginScreen.css';

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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call - replace with your actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        const user = {
          email,
          name: isSignUp ? name : email.split('@')[0]
        };
        onLogin(user);
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const handleCreateAccount = () => {
    console.log('Create account clicked, onSignUpClick:', onSignUpClick);
    if (onSignUpClick) {
      onSignUpClick();
    } else {
      // Fallback for when onSignUpClick is not provided
      console.log('Navigate to registration page');
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