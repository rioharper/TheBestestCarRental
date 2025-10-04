import React, { useEffect, useState } from 'react';
import './AdminLandingPage.css';
import { getAllCars, getAllReservations, addCar, addReservation, updateCar } from '../utils/database';

interface User {
  email: string;
  name: string;
}

interface AdminLandingPageProps {
  user: User;
  onLogout: () => void;
}

const AdminLandingPage: React.FC<AdminLandingPageProps> = ({ user, onLogout }) => {
  const [cars, setCars] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [showAddReservation, setShowAddReservation] = useState(false);
  const [carForm, setCarForm] = useState({
    year: '', size: '', make: '', model: '', availability: '1', seats: '', price: '', imageUrl: '', color: ''
  });
  const [reservationForm, setReservationForm] = useState({
    startDate: '', endDate: '', status: '1', carId: ''
  });
  const [editCarId, setEditCarId] = useState<number|null>(null);
  const [editCarForm, setEditCarForm] = useState<any>({});

  const refreshTables = () => {
    setCars(getAllCars());
    setReservations(getAllReservations());
  };

  useEffect(() => {
    refreshTables();
  }, []);

  const handleCarFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarForm({ ...carForm, [e.target.name]: e.target.value });
  };
  const handleReservationFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationForm({ ...reservationForm, [e.target.name]: e.target.value });
  };
  const handleEditCarFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCarForm({ ...editCarForm, [e.target.name]: e.target.value });
  };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    addCar({
      year: parseInt(carForm.year),
      size: carForm.size,
      make: carForm.make,
      model: carForm.model,
      availability: parseInt(carForm.availability),
      seats: parseInt(carForm.seats),
      price: parseInt(carForm.price),
      imageUrl: carForm.imageUrl,
      color: carForm.color
    });
    setShowAddCar(false);
    setCarForm({ year: '', size: '', make: '', model: '', availability: '1', seats: '', price: '', imageUrl: '', color: '' });
    refreshTables();
  };

  const handleAddReservation = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!reservationForm.startDate || !reservationForm.endDate || !reservationForm.status || !reservationForm.carId) {
      alert('Please fill in all fields.');
      return;
    }
    if (isNaN(Number(reservationForm.status)) || isNaN(Number(reservationForm.carId))) {
      alert('Status and Car ID must be numbers.');
      return;
    }
    addReservation({
      startDate: reservationForm.startDate,
      endDate: reservationForm.endDate,
      status: parseInt(reservationForm.status),
      carId: parseInt(reservationForm.carId)
    });
    setShowAddReservation(false);
    setReservationForm({ startDate: '', endDate: '', status: '1', carId: '' });
    refreshTables();
  };

  // Edit car logic
  const handleEditClick = (car: any) => {
    setEditCarId(car.id);
    setEditCarForm({ ...car });
  };
  const handleEditCarSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCarId !== null) {
      updateCar(editCarId, {
        year: parseInt(editCarForm.year),
        size: editCarForm.size,
        make: editCarForm.make,
        model: editCarForm.model,
        availability: editCarForm.availability === '1' || editCarForm.availability === 1 ? 1 : 0,
        seats: parseInt(editCarForm.seats),
        price: parseInt(editCarForm.price),
        imageUrl: editCarForm.imageUrl,
        color: editCarForm.color
      });
      setEditCarId(null);
      setEditCarForm({});
      refreshTables();
    }
  };
  const handleEditCarCancel = () => {
    setEditCarId(null);
    setEditCarForm({});
  };

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

        <div className="admin-table-section">
          <h2>Cars Management</h2>
          <button className="admin-table-add-btn" onClick={() => setShowAddCar(v => !v)}>
            {showAddCar ? 'Cancel' : 'Add Car'}
          </button>
          {showAddCar && (
            <form className="admin-add-form" onSubmit={handleAddCar}>
              <input name="year" placeholder="Year" value={carForm.year} onChange={handleCarFormChange} required />
              <input name="size" placeholder="Size" value={carForm.size} onChange={handleCarFormChange} required />
              <input name="make" placeholder="Make" value={carForm.make} onChange={handleCarFormChange} required />
              <input name="model" placeholder="Model" value={carForm.model} onChange={handleCarFormChange} required />
              <input name="availability" placeholder="Availability (1/0)" value={carForm.availability} onChange={handleCarFormChange} required />
              <input name="seats" placeholder="Seats" value={carForm.seats} onChange={handleCarFormChange} required />
              <input name="price" placeholder="Price" value={carForm.price} onChange={handleCarFormChange} required />
              <input name="imageUrl" placeholder="Image URL" value={carForm.imageUrl} onChange={handleCarFormChange} required />
              <input name="color" placeholder="Color" value={carForm.color} onChange={handleCarFormChange} required />
              <button type="submit">Add Car</button>
            </form>
          )}
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Year</th>
                <th>Size</th>
                <th>Make</th>
                <th>Model</th>
                <th>Availability</th>
                <th>Seats</th>
                <th>Price</th>
                <th>Image</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{textAlign: 'center'}}>No cars found.</td>
                </tr>
              ) : (
                cars.map(car => (
                  <tr key={car.id}>
                    {editCarId === car.id ? (
                      <>
                        <td>{car.id}</td>
                        <td><input name="year" value={editCarForm.year} onChange={handleEditCarFormChange} /></td>
                        <td><input name="size" value={editCarForm.size} onChange={handleEditCarFormChange} /></td>
                        <td><input name="make" value={editCarForm.make} onChange={handleEditCarFormChange} /></td>
                        <td><input name="model" value={editCarForm.model} onChange={handleEditCarFormChange} /></td>
                        <td><input name="availability" value={editCarForm.availability} onChange={handleEditCarFormChange} /></td>
                        <td><input name="seats" value={editCarForm.seats} onChange={handleEditCarFormChange} /></td>
                        <td><input name="price" value={editCarForm.price} onChange={handleEditCarFormChange} /></td>
                        <td><input name="imageUrl" value={editCarForm.imageUrl} onChange={handleEditCarFormChange} /></td>
                        <td><input name="color" value={editCarForm.color} onChange={handleEditCarFormChange} /></td>
                        <td>
                          <button onClick={handleEditCarSave}>Save</button>
                          <button onClick={handleEditCarCancel}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{car.id}</td>
                        <td>{car.year}</td>
                        <td>{car.size}</td>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{car.available ? 'Yes' : 'No'}</td>
                        <td>{car.seats}</td>
                        <td>{car.price}</td>
                        <td><img src={car.imageUrl} alt={car.model} style={{width: 60}} /></td>
                        <td>{car.color}</td>
                        <td>
                          <button onClick={() => handleEditClick(car)}>Edit</button>
                          <button>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="admin-table-section">
          <h2>Reservations Management</h2>
          <button className="admin-table-add-btn" onClick={() => setShowAddReservation(v => !v)}>
            {showAddReservation ? 'Cancel' : 'Add Reservation'}
          </button>
          {showAddReservation && (
            <form className="admin-add-form" onSubmit={handleAddReservation}>
              <input name="startDate" placeholder="Start Date (YYYY-MM-DD)" value={reservationForm.startDate} onChange={handleReservationFormChange} required />
              <input name="endDate" placeholder="End Date (YYYY-MM-DD)" value={reservationForm.endDate} onChange={handleReservationFormChange} required />
              <input name="status" placeholder="Status (1/0)" value={reservationForm.status} onChange={handleReservationFormChange} required />
              <input name="carId" placeholder="Car ID" value={reservationForm.carId} onChange={handleReservationFormChange} required />
              <button type="submit">Add Reservation</button>
            </form>
          )}
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Car ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{textAlign: 'center'}}>No reservations found.</td>
                </tr>
              ) : (
                reservations.map(res => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.startDate}</td>
                    <td>{res.endDate}</td>
                    <td>{res.status}</td>
                    <td>{res.carId}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminLandingPage;
