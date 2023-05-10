import React from 'react';
import { FaChair } from 'react-icons/fa';

const SeatMapper = ({ selectedSeats, onSeatSelection }) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 9;

  const isSeatSelected = seat => selectedSeats.includes(seat);

  return (
    <div className="flex flex-col items-center">
      {rows.map(row => (
        <div className="flex justify-center" key={row}>
          <div className="flex items-center mr-2">
            <span>{row}</span>
          </div>
          {[...Array(seatsPerRow)].map((_, index) => {
            const seat = `${row}${index + 1}`;
            const isSelected = isSeatSelected(seat);
            const seatStatus = isSelected ? 'Selected' : 'Available';

            return (
              <div
                key={seat}
                title={`${seat}: ${seatStatus}`} // Add title attribute here
                className={`bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center m-1 cursor-pointer ${
                  isSelected ? 'bg-cyan-200 text-cyan-500' : ''
                }`}
                onClick={() => onSeatSelection(seat)}
                role="button"
                aria-pressed={isSelected}>
                <FaChair />
                <span className="sr-only">{`Seat ${seat} ${
                  isSelected ? 'selected' : 'unselected'
                }`}</span>
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex justify-center">
        <div className="flex items-center mx-4">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <span className="ml-2">Available</span>
        </div>
        <div className="flex items-center mx-4">
          <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
          <span className="ml-2">Selected</span>
        </div>
        <div className="flex items-center mx-4">
          <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
          <span className="ml-2">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMapper;
