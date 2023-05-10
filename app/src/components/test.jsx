import React, { useState } from 'react';

const TestSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Adult');

  const handleSeatClick = ({ id, price }) => {
    const index = selectedSeats.indexOf(id);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, id]);
      setTotalPrice(totalPrice + price);
    } else {
      if (window.confirm('Are you sure you want to unselect this seat?')) {
        setSelectedSeats(selectedSeats.filter(seatId => seatId !== id));
        setTotalPrice(totalPrice - price);
      }
    }
  };

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 8;
  const seats = rows.flatMap(row => {
    return Array.from({ length: seatsPerRow }, (_, index) => ({
      id: `${row}-${index + 1}`,
      price: row < 2 ? 10 : 8
    }));
  });

  const isSeatSelected = seat => selectedSeats.indexOf(seat.id) !== -1;

  const isSeatDisabled = seat => {
    const row = seat.id[0];
    const seatNum = seat.id.slice(2);
    const priceCategory = selectedCategory === 'Child' ? row < 2 : false;
    const blockedSeats = row === 'C' && seatNum >= 5;
    return isSeatSelected(seat) || priceCategory || blockedSeats;
  };

  const getSeatClassName = seat => {
    let className = 'bg-blue-500 rounded-full h-10 w-10 mx-1 my-2';
    if (isSeatSelected(seat)) {
      className += ' bg-red-500';
    }
    // if (isSeatDisabled(seat)) {
    //   className += ' bg-gray-500 cursor-not-allowed';
    //   className = className.replace('bg-gray-500', 'bg-red-500');
    // }
    return className;
  };

  const handleConfirmBooking = () => {
    // send selectedSeats and totalPrice to the server for processing
    console.log('Selected Seats:', selectedSeats.join(', '));
    console.log('Total Price:', totalPrice);
    // clear the selectedSeats and totalPrice state
    setSelectedSeats([]);
    setTotalPrice(0);
  };
  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mt-10">Seat Selection</h1>
      <div className="mt-5">
        <label className="mr-3 font-bold">Price Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="Adult">Adult</option>
          <option value="Child">Child</option>
        </select>
      </div>
      <h1 className="text-3xl font-bold mb-4">Cinema Booking App</h1>
      <p className="mb-2">Select your seats:</p>
      <div className="flex flex-wrap justify-center mt-5">
        {seats.map(seat => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            className={getSeatClassName(seat)}
            //disabled={isSeatDisabled(seat, disabledSeats)}
          >
            {seat.id}
          </button>
        ))}
      </div>
      <div className="selectedSeats mt-4">
        <p className="mb-2">Selected Seats: {selectedSeats.join(', ')}</p>
      </div>
      <p className="mb-2">Total Price: ${totalPrice}</p>
      <button
        onClick={handleConfirmBooking}
        disabled={selectedSeats.length === 0}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
        Confirm Booking
      </button>
    </div>
  );
};

export default TestSeat;
