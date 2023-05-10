import { useState } from 'react';

const SeatSelection = ({ rows, seatsPerRow, pricePerSeat, onSeatSelect }) => {
  // Define state variables for selected seats and total price
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Define a function to update the selected seats and total price
  const updateSelectedSeats = (seats, price) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    onSeatSelect(seats);
  };

  // Define a function to check if a seat is selected
  const isSeatSelected = (row, seat) => {
    return selectedSeats.some(
      selectedSeat => selectedSeat.row === row && selectedSeat.seat === seat
    );
  };

  // Define a function to render the seat map
  const renderSeatMap = () => {
    const seatMap = [];
    for (let i = 1; i <= rows; i++) {
      const rowSeats = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatData = { row: i, seat: j, price: pricePerSeat };
        rowSeats.push(
          <button
            key={j}
            className={`w-8 h-8 rounded-full border-2 border-gray-300 ${
              isSeatSelected(i, j) ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => {
              const seatIndex = selectedSeats.findIndex(
                selectedSeat => selectedSeat.row === i && selectedSeat.seat === j
              );
              if (seatIndex >= 0) {
                const newSelectedSeats = [...selectedSeats];
                newSelectedSeats.splice(seatIndex, 1);
                updateSelectedSeats(newSelectedSeats, totalPrice - pricePerSeat);
              } else {
                updateSelectedSeats([...selectedSeats, seatData], totalPrice + pricePerSeat);
              }
            }}>
            {j}
          </button>
        );
      }
      seatMap.push(
        <div key={i} className="flex items-center justify-center">
          <span className="mr-4">{String.fromCharCode(64 + i)}</span>
          {rowSeats}
        </div>
      );
    }
    return seatMap;
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
      {/* Render the seat map */}
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col justify-center items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-bold">Selected</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span className="text-sm font-bold">Available</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="w-8 h-8 bg-blueGray-500 rounded-full"></div>
          <span className="text-sm font-bold">Reserved</span>
        </div>
        {renderSeatMap()}
      </div>
      {/* Render the selected seats and price */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Selected Seats:</h3>
        <ul className="list-disc list-inside mb-4">
          {selectedSeats.map(seat => (
            <li key={`${seat.row}-${seat.seat}`}>
              Row {seat.row}, Seat {seat.seat}
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold">Total Price: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default SeatSelection;
