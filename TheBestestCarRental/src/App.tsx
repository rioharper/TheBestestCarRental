import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import LandingPage from './components/LandingPage'
import SignUpScreen from './components/SignUpScreen'
import BookingPage from './components/BookingPage'


import './App.css'

interface User {
  email: string;
  name: string;
}

interface BookingData {
  car: any;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
}

interface Booking {
  id: string;
  car: any;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  totalPrice: number;
  days: number;
  payment: any;
  user: User;
  timestamp: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [userBookings, setUserBookings] = useState<Booking[]>([])

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
    setShowBooking(false);
    setBookingData(null);
    setUserBookings([]);
    console.log('User logged out');
  };

  const handleSignInClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
    setShowBooking(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
    setShowBooking(false);
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
    setShowSignUp(false);
    setShowBooking(false);
  };

  const handleBookNow = (car: any, details: any) => {
    setBookingData({
      car,
      pickupDate: details.pickupDate,
      pickupTime: details.pickupTime,
      dropoffDate: details.dropoffDate,
      dropoffTime: details.dropoffTime
    });
    setShowBooking(true);
  };

  const handleConfirmBooking = (completeBookingData: any) => {
    console.log('Booking confirmed:', completeBookingData);
    
    // Add booking to user's bookings
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      ...completeBookingData
    };
    setUserBookings(prev => [...prev, newBooking]);
    
    alert(`Booking confirmed for ${completeBookingData.car.make} ${completeBookingData.car.model}!\nTotal: $${completeBookingData.totalPrice}`);
    setShowBooking(false);
    setBookingData(null);
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

  if (showBooking && bookingData && user) {
    return (
      <BookingPage
        car={bookingData.car}
        pickupDate={bookingData.pickupDate}
        pickupTime={bookingData.pickupTime}
        dropoffDate={bookingData.dropoffDate}
        dropoffTime={bookingData.dropoffTime}
        user={user}
        onBack={handleBackToLanding}
        onConfirmBooking={handleConfirmBooking}
      />
    );
  }

  // Always show LandingPage, whether logged in or not
  return (
    <LandingPage 
      onSignInClick={handleSignInClick} 
      user={user} 
      onLogout={handleLogout}
      onBookNow={handleBookNow}
      userBookings={userBookings}
    />
  );
}

export default App
