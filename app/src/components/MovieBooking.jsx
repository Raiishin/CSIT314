// src/components/MovieBooking.js
import React, { useState } from 'react';

const MovieBooking = () => {
  const movieDetails = {
    title: 'The Avengers',
    runtime: 143,
    rating: 'PG-13',
    genre: 'Action, Adventure, Sci-Fi',
    releaseDate: '2012-05-04'
  };

  const totalSeats = 10;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = seatNumber => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handlePurchase = () => {
    alert(`Purchased ${selectedSeats.length} tickets for ${movieDetails.title}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold mb-4">{movieDetails.title}</h1>
      <p>Runtime: {movieDetails.runtime} minutes</p>
      <p>Rating: {movieDetails.rating}</p>
      <p>Genre: {movieDetails.genre}</p>
      <p>Release Date: {movieDetails.releaseDate}</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Select Seats</h2>
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: totalSeats }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleSeatSelection(index + 1)}
              className={`w-full py-2 text-white ${
                selectedSeats.includes(index + 1) ? 'bg-green-500' : 'bg-blue-500'
              }`}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Purchase</h2>
        <p>
          Total Tickets: {selectedSeats.length} (Seats: {selectedSeats.join(', ')})
        </p>
        <button
          onClick={handlePurchase}
          className="w-full mt-4 py-2 bg-yellow-500 text-white font-semibold">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default MovieBooking;
