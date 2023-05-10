import React, { useState } from 'react';
import './BookSeat.css';

const BookSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatClick = ({ id, price }) => {
    const index = selectedSeats.indexOf(id);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, id]);
      setTotalPrice(totalPrice + price);
    } else {
      if (window.confirm('Are you sure you want to unselect this seat?')) {
        const newSelectedSeats = [...selectedSeats];
        newSelectedSeats.splice(index, 1);
        setSelectedSeats(newSelectedSeats);
        setTotalPrice(totalPrice - price);
      }
    }
  };

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 8;
  const seats = [];
  for (let row = 0; row < rows.length; row++) {
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      seats.push({
        id: `${rows[row]}-${seatNum}`,
        price: row < 2 ? 10 : 8
      });
    }
  }

  const isSeatSelected = seat => selectedSeats.indexOf(seat) !== -1;

  const isSeatDisabled = seat => {
    const row = seat.id[0];
    const seatNum = seat.id.slice(2);
    return isSeatSelected(seat) || (row === 'C' && seatNum >= 5);
  };

  const getSeatClassName = seat => {
    let className = 'seat';
    if (isSeatSelected(seat)) {
      className += ' selected';
    }
    if (isSeatDisabled(seat)) {
      className += ' disabled';
    }
    return className;
  };

  const handleConfirmBooking = () => {
    // send selectedSeats and totalPrice to the server for processing
    console.log('Selected Seats:', selectedSeats.map(seat => seat.id).join(', '));
    console.log('Total Price:', totalPrice);
    // clear the selectedSeats and totalPrice state
    setSelectedSeats([]);
    setTotalPrice(0);
  };

  return (
    <div>
      <h1>Cinema Booking App</h1>
      <p>Select your seats:</p>
      <div className="seats">
        {seats.map(seat => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            className={getSeatClassName(seat)}
            disabled={isSeatDisabled(seat)}>
            {seat.id}
          </button>
        ))}
      </div>
      <div className="selectedSeats">
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
      </div>
      <p>Total Price: ${totalPrice}</p>
      <button
        onClick={handleConfirmBooking}
        disabled={selectedSeats.length === 0}
        className="confirmButton">
        Confirm Booking
      </button>
    </div>
  );
};

export default BookSeats;
