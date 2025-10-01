import React, { useState } from 'react';
import './SignUpScreen.css';

interface SignUpScreenProps {
  onSignUp: (user: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    driversLicense: string;
  }) => void;
  onBack?: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [driversLicense, setDriversLicense] = useState<File | null>(null);
  const [driversLicensePreview, setDriversLicensePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file for your driver\'s license');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setDriversLicense(file);
      setError('');
      setIsVerified(false);

      // Create preview
      const reader = new FileReader();
      reader.onload = async (e) => {
        setDriversLicensePreview(e.target?.result as string);
        
        // Automatically start verification after image loads
        setVerificationLoading(true);
        
        try {
          // Simulate license verification API call with 1.5 second delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Mock verification - in reality, this would use AI/OCR to verify the license
          const isValid = Math.random() > 0.1; // 90% success rate for demo
          
          if (isValid) {
            setIsVerified(true);
            setError('');
          } else {
            setError('Driver\'s license verification failed. Please ensure the image is clear and shows the front of your license.');
            setIsVerified(false);
          }
        } catch (err) {
          setError('Verification failed. Please try again.');
          setIsVerified(false);
        } finally {
          setVerificationLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

    if (!driversLicense) {
      setError('Please upload your driver\'s license');
      setLoading(false);
      return;
    }

    if (!isVerified) {
      setError('Please verify your driver\'s license before proceeding');
      setLoading(false);
      return;
    }

    try {
      // Simulate account creation API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        driversLicense: driversLicense.name
      };
      
      onSignUp(user);
    } catch (err) {
      setError('Account creation failed. Please try again.');
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
            <label htmlFor="driversLicense">Driver's License (Front Image)</label>
            <div className="license-upload-section">
              <input
                type="file"
                id="driversLicense"
                accept="image/*"
                onChange={handleFileUpload}
                className="file-input"
                required
              />
              <label htmlFor="driversLicense" className="file-input-label">
                <svg className="upload-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17,8 12,3 7,8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {driversLicense ? driversLicense.name : 'Choose file or drag and drop'}
              </label>
              
              {driversLicensePreview && (
                <div className="license-preview">
                  <img src={driversLicensePreview} alt="Driver's License Preview" />
                  <div className="verification-section">
                    {verificationLoading ? (
                      <div className="verification-loading">
                        <div className="loading-spinner"></div>
                        <p>Verifying license...</p>
                      </div>
                    ) : isVerified ? (
                      <div className="verification-success">
                        <div className="verified-badge">✓ License Verified</div>
                        <p>Your driver's license has been successfully verified!</p>
                      </div>
                    ) : (
                      <div className="verification-failed">
                        <div className="failed-badge">✗ Verification Failed</div>
                        <p>Please try uploading a clearer image of your license.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="signup-btn" 
            disabled={loading || !isVerified}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account? <span className="login-link-text">Sign in here</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
