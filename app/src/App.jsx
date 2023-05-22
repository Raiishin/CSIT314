import Navbar from './components/Navbar';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import Register from './components/Register';

import Login from './components/Login';
import Promotions from './components/Promotions';
import ResetPassword from './components/ResetPassword';
import MovieDetails from './components/MovieDetails';
import ManageMovies from './components/ManageMovies';
import ProfilePage from './components/ProfilePage';
import SeatSelectionPage from './components/SeatSelectionPage';

const App = () => {
  return (
    <div className="text-center bg-dark-brown">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/manage-movies" element={<ManageMovies />} />
        <Route path="/tickets/:id" element={<SeatSelectionPage />} />
      </Routes>
    </div>
  );
};

export default App;
