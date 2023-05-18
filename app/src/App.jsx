import Navbar from './components/Navbar';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import Register from './components/Register';

import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import MovieDetails from './components/MovieDetails';
import ManageMovies from './components/ManageMovies';
import ProfilePage from './components/ProfilePage';

const App = () => {
  return (
    <div className="text-center bg-dark-brown">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* <Route path="/bookseats" element={<BookSeats />} /> */}
        {/* <Route path="/TestSeat" element={<TestSeat />} /> */}
        <Route path="/manage-movies" element={<ManageMovies />} />
      </Routes>
    </div>
  );
};

export default App;
