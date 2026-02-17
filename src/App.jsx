import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Add this import
import HappyTailsNavbar from './components/HappyTailsNavbar';
import HappyTailsFooter from './components/HappyTailsFooter'; // Import new footer
import Grooming from './pages/Grooming';
import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import ChooseService from './pages/ChooseService';
import ScheduleAppointment from './pages/ScheduleAppointment';
import BookingConfirmation from './pages/BookingConfirmation';
import AppointmentConfirmed from './pages/AppointmentConfirmed';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Boarding from './pages/Boarding';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add Bootstrap CSS
import BoardingBook from './pages/BoardingBook';
import BoardingConfirmed from './pages/BoardingConfirmed';
import BoardingAppointmentConfirmed from './pages/BoardingAppointmentConfirmed';
import Petcafe from './pages/Petcafe';
import BdayPawty from './pages/bdaypawty';
import BookPawty from './pages/BookPawty';
import Profile from './pages/Profile';
import SidebarProfile from './components/SidebarProfile';

// Create a wrapper component that conditionally shows the navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Don't show HappyTailsNavbar on Home page
  if (isHomePage) {
    return null;
  }
  
  return <HappyTailsNavbar />;
};

function App() {
  return (
    <Router>
      <CartProvider> {/* Wrap everything with CartProvider */}
        <div className="App d-flex flex-column min-vh-100">
          {/* Conditionally render the navbar */}
          <NavbarWrapper />
          
          <main className="main-content flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grooming" element={<Grooming />} />
              <Route path="/boarding" element={<Boarding />} />
              <Route path="/boarding/book" element={<BoardingBook />} />
              <Route path="/boarding-confirmed" element={<BoardingConfirmed />} />
              <Route path="/booking" element={<BookAppointment />} />
              <Route path="/choose-service" element={<ChooseService />} />
              <Route path="/schedule" element={<ScheduleAppointment />} />
              <Route path="/confirmation" element={<BookingConfirmation />} />
              <Route path="/appointment-confirmed" element={<AppointmentConfirmed />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/petcafe" element={<Petcafe />} />
              <Route path="/boarding-appointment-confirmed" element={<BoardingAppointmentConfirmed />} />
              <Route path="/bdaypawty" element={<BdayPawty />} />
              <Route path="/bookpawty" element={<BookPawty />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          
          {/* New Happy Tails Footer - Shows on ALL pages */}
          <HappyTailsFooter />
        </div>
      </CartProvider> {/* Close CartProvider */}
    </Router>
  );
}

export default App;