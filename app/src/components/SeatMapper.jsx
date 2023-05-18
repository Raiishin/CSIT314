import React, { useState, useEffect } from 'react';
import { FaChair } from 'react-icons/fa';

const SeatMapper = () => {
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [adultQuantity, setAdultQuantity] = useState(0);
  const [childrenQuantity, setChildrenQuantity] = useState(0);
  const [seniorQuantity, setSeniorQuantity] = useState(0);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch('seatData.json');
        const data = await response.json();
        setSeatData(data);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };

    fetchSeats();
  }, []);

  const isSeatSelected = (seatRow, seatNumber) => {
    return selectedSeats.some(seat => seat.seatRow === seatRow && seat.seatNumber === seatNumber);
  };

  const handleSeatSelection = (seatRow, seatNumber) => {
    const selectedSeat = seatData.find(
      seat =>
        seat.seatRow === seatRow &&
        seat.seatNumber === seatNumber &&
        seat.status.toLowerCase() === 'available'
    );

    if (selectedSeat) {
      const seat = { seatRow, seatNumber };
      setSelectedSeats(prevSelectedSeats => {
        const seatIndex = prevSelectedSeats.findIndex(
          seat => seat.seatRow === seatRow && seat.seatNumber === seatNumber
        );
        if (seatIndex > -1) {
          return [
            ...prevSelectedSeats.slice(0, seatIndex),
            ...prevSelectedSeats.slice(seatIndex + 1)
          ];
        } else {
          return [...prevSelectedSeats, seat];
        }
      });
    }
  };
  const totalSelectedSeats = selectedSeats.length;

  useEffect(() => {
    if (totalSelectedSeats < adultQuantity) {
      setAdultQuantity(totalSelectedSeats);
    }

    if (totalSelectedSeats < childrenQuantity) {
      setChildrenQuantity(totalSelectedSeats);
    }

    if (totalSelectedSeats < seniorQuantity) {
      setSeniorQuantity(totalSelectedSeats);
    }
  }, [totalSelectedSeats]);

  const handleAdultQuantityChange = value => {
    const newAdultQuantity = Math.min(value, totalSelectedSeats);
    setAdultQuantity(newAdultQuantity);
    setChildrenQuantity(Math.min(childrenQuantity, totalSelectedSeats - newAdultQuantity));
    setSeniorQuantity(Math.min(seniorQuantity, totalSelectedSeats - newAdultQuantity));
  };

  const handleChildrenQuantityChange = value => {
    const newChildrenQuantity = Math.min(value, totalSelectedSeats - adultQuantity);
    setChildrenQuantity(newChildrenQuantity);
    setSeniorQuantity(
      Math.min(seniorQuantity, totalSelectedSeats - adultQuantity - newChildrenQuantity)
    );
  };

  const handleSeniorQuantityChange = value => {
    setSeniorQuantity(Math.min(value, totalSelectedSeats - adultQuantity - childrenQuantity));
  };
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 gap-2">
        {seatData.map(seat => (
          <div
            key={`${seat.seatRow}-${seat.seatNumber}`}
            title={`${seat.seatRow}-${seat.seatNumber}: ${seat.status}`}
            className={`flex justify-center items-center w-8 h-8 m-1 cursor-pointer ${
              seat.status.toLowerCase() === 'available' &&
              isSeatSelected(seat.seatRow, seat.seatNumber)
                ? 'bg-cyan-200 text-cyan-500'
                : seat.status.toLowerCase() === 'unavailable'
                ? 'bg-red-500'
                : 'bg-gray-300'
            }`}
            onClick={() => handleSeatSelection(seat.seatRow, seat.seatNumber)}
            role="button"
            aria-pressed={isSeatSelected(seat.seatRow, seat.seatNumber)}>
            <FaChair />
            <span className="sr-only">{`Seat ${seat.seatRow}-${seat.seatNumber} ${
              isSeatSelected(seat.seatRow, seat.seatNumber) ? 'selected' : 'unselected'
            }`}</span>
          </div>
        ))}
      </div>
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
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="ml-2">Unavailable</span>
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-gray-200 text-black font-bold py-2 px-4 rounded">
          Total Tickets: {selectedSeats.length} (Seats:{' '}
          {selectedSeats.map(seat => `${seat.seatRow}${seat.seatNumber}`).join(', ')})
        </div>
      </div>
      <div className="bg-gray-200 py-0">
        <div className="container mx-auto">
          <h2 className="text-xl mb-4">Selected Seats:</h2>
          <div className="flex flex-wrap justify-center">
            {selectedSeats.length === 0 && <p className="text-gray-600">None</p>}
            {selectedSeats.map((seat, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-2 mb-2">
                <p className="text-cyan-400 font-bold">{`${seat.seatRow}${seat.seatNumber}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="adultQuantity">Adult:</label>
        <select
          id="adultQuantity"
          value={adultQuantity}
          onChange={e => handleAdultQuantityChange(Number(e.target.value))}>
          {Array.from({ length: totalSelectedSeats - childrenQuantity - seniorQuantity + 1 }).map(
            (_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            )
          )}
        </select>
      </div>
      <div className="mt-2">
        <label htmlFor="childrenQuantity">Children:</label>
        <select
          id="childrenQuantity"
          value={childrenQuantity}
          onChange={e => handleChildrenQuantityChange(Number(e.target.value))}>
          {Array.from({ length: totalSelectedSeats - adultQuantity - seniorQuantity + 1 }).map(
            (_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            )
          )}
        </select>
      </div>
      <div className="mt-2">
        <label htmlFor="seniorQuantity">Senior:</label>
        <select
          id="seniorQuantity"
          value={seniorQuantity}
          onChange={e => handleSeniorQuantityChange(Number(e.target.value))}>
          {Array.from({ length: totalSelectedSeats - adultQuantity - childrenQuantity + 1 }).map(
            (_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};

export default SeatMapper;
