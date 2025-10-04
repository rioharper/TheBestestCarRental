import React, { useState, useEffect } from 'react';
import './SignUpScreen.css';
import { initDatabase, createUser, getUserByEmail } from '../utils/database';

interface SignUpScreenProps {
  onSignUp: (user: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    driversLicense: string;
  }) => void;
  onBack?: () => void;
  onSignIn?: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onBack, onSignIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [driversLicense, setDriversLicense] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Please enter a password');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!driversLicense.trim()) {
      setError('Please enter your driver\'s license number');
      setLoading(false);
      return;
    }

    try {
      if (!dbInitialized) {
        setError('Database not ready. Please wait...');
        setLoading(false);
        return;
      }

      // Check if user already exists
      const existingUser = getUserByEmail(email.trim());
      if (existingUser) {
        setError('An account with this email already exists. Please sign in instead.');
        setLoading(false);
        return;
      }

      // Create new user in database
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      const newUser = createUser(email.trim(), password, fullName);
      
      if (newUser) {
        // Account created successfully, pass user data to parent
        const user = {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          driversLicense: driversLicense.trim()
        };
        
        onSignUp(user);
      } else {
        setError('Account creation failed. Please try again.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Account creation failed. Please try again.');
      }
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {onBack && (
          <button type="button" className="back-btn" onClick={onBack}>
            ← Back
          </button>
        )}
        
        <div className="signup-header">
          <span className="logo-text">CREATE ACCOUNT</span>
          <p>Join The Bestest Car Rental today</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="name-row">
            <div className="form-group half-width">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="form-group half-width">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
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
              placeholder="Create a strong password (min 8 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="driversLicense">Driver's License Number</label>
            <input
              type="text"
              id="driversLicense"
              value={driversLicense}
              onChange={(e) => setDriversLicense(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter your license number"
              maxLength={20}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="signup-btn" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account? <span className="login-link-text" onClick={onSignIn}>Sign in here</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
