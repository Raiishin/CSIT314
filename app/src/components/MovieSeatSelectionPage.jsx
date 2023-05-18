import React, { useState, useEffect } from 'react';

const MovieSeatSelectionPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [theatre, setTheatre] = useState('');
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adultSeats, setAdultSeats] = useState(0);
  const [childrenSeats, setChildrenSeats] = useState(0);
  const [seniorSeats, setSeniorSeats] = useState(0);

  const handleSeatClick = seat => {
    const seatIndex = selectedSeats.findIndex(
      selectedSeat =>
        selectedSeat.seatRow === seat.seatRow && selectedSeat.seatNumber === seat.seatNumber
    );

    if (seatIndex > -1) {
      // Remove seat from selectedSeats
      const updatedSelectedSeats = [...selectedSeats];
      updatedSelectedSeats.splice(seatIndex, 1);
      setSelectedSeats(updatedSelectedSeats);
    } else {
      // Add seat to selectedSeats
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleViewSeatPlan = () => {
    alert(`Showing seating plan for ${date} ${time} at ${theatre}`);
    // Filter seat data based on selected date, time, and theatre
    fetch(`seatData.json`)
      .then(response => response.json())
      .then(data => setSeatData(data))
      .catch(error => console.error('Error fetching seat data:', error));
    const filteredSeats = seatData.filter(
      seat => seat.date === date && seat.time === time && seat.theatre === theatre
    );

    setSeatData(filteredSeats);
  };

  //   useEffect(() => {
  //     // Fetch data from seatData.json
  //     const fetchSeats = async () => {
  //       try {
  //         const response = await fetch('seatData.json');
  //         const data = await response.json();
  //         setSeatData(data);
  //         setSelectedSeats(data);
  //       } catch (error) {
  //         console.error('Error fetching seat data:', error);
  //       }
  //     };

  //     fetchSeats();
  //   }, []);

  const handleDateChange = e => {
    setDate(e);
  };

  const handleTimeChange = e => {
    setTime(e);
  };

  const handleTheatreChange = e => {
    setTheatre(e);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let adultSeats = 0;
    let childrenSeats = 0;
    let seniorSeats = 0;

    selectedSeats.forEach(seat => {
      if (seat.category === 'Adult') {
        totalPrice += seat.price;
        adultSeats += 1;
      } else if (seat.category === 'Children') {
        totalPrice += seat.price;
        childrenSeats += 1;
      } else if (seat.category === 'Senior') {
        totalPrice += seat.price;
        seniorSeats += 1;
      }
    });

    setTotalPrice(totalPrice);
    setAdultSeats(adultSeats);
    setChildrenSeats(childrenSeats);
    setSeniorSeats(seniorSeats);
  };

  const handleCheckout = () => {
    // Handle checkout with preferred payment method
    // You can implement the payment logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Movie Seat Selection</h1>

      <>
        <div>
          <p className="text-gray-600 font-bold">Date</p>
          <select
            id="date"
            name="date"
            value={date}
            onChange={e => handleDateChange(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select a date</option>
            <option value="2023-05-24">May 24, 2023</option>
            <option value="2023-05-25">May 25, 2023</option>
            <option value="2023-05-26">May 26, 2023</option>
            <option value="2023-05-27">May 27, 2023</option>
          </select>
          <p className="text-gray-600 font-bold">Time</p>
          <select
            id="time"
            name="time"
            value={time}
            onChange={e => handleTimeChange(e.target.value)}
            disabled={!date}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select a time</option>
            <option value="08:00 PM">8:00 PM</option>
            <option value="09:00 PM">9:00 PM</option>
            <option value="10:00 PM">10:00 PM</option>
          </select>
          <p className="text-gray-600 font-bold">Theater</p>
          <select
            id="theater"
            name="theater"
            value={theatre}
            onChange={e => handleTheatreChange(e.target.value)}
            disabled={!date}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select a theater</option>
            <option value="Theater 1">Theater 1</option>
            <option value="Theater 2">Theater 2</option>
            <option value="Theater 3">Theater 3</option>
          </select>
          <div>
            <button
              className="bg-gray-200 text-white font-bold py-2 px-4 rounded mt-8 enabled:bg-cyan-600"
              disabled={!date || !theatre || !time}
              onClick={handleViewSeatPlan}>
              View Seating Plan
            </button>
          </div>
        </div>
      </>

      {/* Render the seat map */}
      <div className="mb-4">
        {seatData.map(seat => (
          <button
            key={`${seat.seatRow}-${seat.seatNumber}`}
            onClick={() => handleSeatClick(seat)}
            className={`mr-2 mb-2 px-2 py-1 rounded ${
              selectedSeats.some(
                selectedSeat =>
                  selectedSeat.seatRow === seat.seatRow &&
                  selectedSeat.seatNumber === seat.seatNumber
              )
                ? 'bg-red-500'
                : 'bg-green-500'
            }`}
            disabled={seat.status !== 'available'}>
            {seat.seatRow}-{seat.seatNumber}
          </button>
        ))}
      </div>

      {/* Display seat summary and checkout button */}
      <div>
        <h2 className="text-lg font-bold mb-2">Seat Summary:</h2>
        <p>Selected Seats: {selectedSeats.length}</p>
        <p>Adult Seats: {adultSeats}</p>
        <p>Children Seats: {childrenSeats}</p>
        <p>Senior Seats: {seniorSeats}</p>
        <p>Total Price: ${totalPrice}</p>

        <button onClick={handleCheckout} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default MovieSeatSelectionPage;
