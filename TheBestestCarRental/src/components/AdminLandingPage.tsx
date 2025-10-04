import React from 'react';
import './AdminLandingPage.css';

interface User {
  email: string;
  name: string;
}

interface AdminLandingPageProps {
  user: User;
  onLogout: () => void;
}

const AdminLandingPage: React.FC<AdminLandingPageProps> = ({ user, onLogout }) => {
  return (
    <div className="admin-landing-page">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>Welcome, {user.name}</span>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-welcome">
          <h2>Welcome to the Admin Portal</h2>
          <p>Manage your car rental business from here.</p>
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-card">
            <h3>Manage Cars</h3>
            <p>Add, edit, or remove vehicles from your fleet</p>
            <button className="admin-button">Go to Cars</button>
          </div>

          <div className="admin-card">
            <h3>View Reservations</h3>
            <p>See all customer bookings and reservations</p>
            <button className="admin-button">Go to Reservations</button>
          </div>

          <div className="admin-card">
            <h3>Manage Users</h3>
            <p>View and manage customer accounts</p>
            <button className="admin-button">Go to Users</button>
          </div>

          <div className="admin-card">
            <h3>Reports</h3>
            <p>View business analytics and reports</p>
            <button className="admin-button">Go to Reports</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLandingPage;
