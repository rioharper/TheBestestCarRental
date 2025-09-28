import React from 'react';
import './Dashboard.css';

interface User {
  email: string;
  name: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🚗 The Bestest Car Rental</h1>
          <div className="user-info">
            <span>Welcome, {user.name}!</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome to Your Dashboard</h2>
          <p>You are successfully logged in as {user.email}</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">🔍</div>
            <h3>Browse Cars</h3>
            <p>Find the perfect car for your next adventure</p>
            <button className="card-btn">View Cars</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📅</div>
            <h3>My Bookings</h3>
            <p>Manage your current and past reservations</p>
            <button className="card-btn">View Bookings</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Profile</h3>
            <p>Update your personal information and preferences</p>
            <button className="card-btn">Edit Profile</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">💳</div>
            <h3>Payment Methods</h3>
            <p>Manage your payment options</p>
            <button className="card-btn">Manage Payments</button>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary">Book a Car</button>
            <button className="action-btn secondary">Contact Support</button>
            <button className="action-btn secondary">Leave a Review</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;