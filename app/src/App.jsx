import Navbar from './components/Navbar';
import React, { useEffect, useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import Register from './components/Register';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import MovieDetails from './components/MovieDetails';

// import BookSeats from './components/BookSeats';
// import TestSeat from './components/test';

import { getMovies } from './api/movies';

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const retrieveMovies = async () => {
      if (movies.length === 0) {
        const moviesResponse = await getMovies();
        console.log(moviesResponse);

        // Check if there are any errors
        if (moviesResponse.errorMessage === '') {
          setMovies(moviesResponse.items);
        }
      }
    };

    retrieveMovies();
  }, [getMovies, setMovies]);

  return (
    <div className="text-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* <Route path="/bookseats" element={<BookSeats />} /> */}
        {/* <Route path="/TestSeat" element={<TestSeat />} /> */}
      </Routes>
    </div>
  );
};

export default App;
