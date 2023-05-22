import React, { useState } from 'react';
import { checkBooking } from '../api/movies';

const CheckPurchase = () => {
  const [inputValue, setInputValue] = useState('');
  const [movieName, setMovieName] = useState('');
  const [seats, setSeats] = useState([]);
  const [showTime, setShowTime] = useState('');
  const [cinema, setCinema] = useState('');
  const [date, setDate] = useState('');
  const [purchaseFound, setPurchaseFound] = useState(true);

  const handleSearch = async () => {
    // Here, you can make an API call or fetch data from your backend
    // using the email address or contact number to retrieve the purchase details
    // Replace the following code with your actual logic

    const response = await checkBooking(inputValue);
    console.log(response);

    if (response.message) {
      alert(response.message);
      setPurchaseFound(false);
    } else {
      setPurchaseFound(true);

      setMovieName(response.movieName);
      setSeats(response.seats);
      setShowTime(response.showtime);
      setCinema(response.cinema);
      setDate(response.date);
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter' && inputValue !== '') {
      handleSearch();
    }
  };

  return (
    <div style={styles.quickBuySubContainter}>
      <div className="mb-4">
        <p style={styles.quickBuyTitle} htmlFor="inputValue">
          Please enter your Booking ID
        </p>
        <input
          className="focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="inputValue"
          type="text"
          placeholder="E.g 1010101010-1010"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <button style={styles.quickBuyButtonBlue} onClick={handleSearch}>
        Search
      </button>
      {purchaseFound ? (
        seats.length > 0 && (
          <div className="mt-6 text-white font-bold">
            <h2 className="text-lg font-bold mb-2">Purchase Details:</h2>
            <p>
              <strong>Movie Name: </strong>
              <span className="text-gray-400">{movieName}</span>
            </p>
            <p>
              <strong>Seats: </strong>
              <span className="text-gray-400">{seats.join(', ')}</span>
            </p>
            <p>
              <strong>Date: </strong>
              <span className="text-gray-400">{date}</span>
            </p>
            <p>
              <strong>Show Time: </strong>
              <span className="text-gray-400">{showTime}</span>
            </p>
            <p>
              <strong>Cinema: </strong>
              <span className="text-gray-400">{cinema}</span>
            </p>
          </div>
        )
      ) : (
        <div className="mt-6 text-red-500">No purchase found.</div>
      )}
    </div>
  );
};

const styles = {
  quickBuySubContainter: {
    display: 'flex',
    flexDirection: 'column'
  },
  quickBuyTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  quickBuyButtonBlue: {
    padding: '10px 20px',
    borderRadius: '10px',
    flex: 1,
    color: 'white',
    backgroundColor: '#012E41',
    marginLeft: '5px'
  }
};

export default CheckPurchase;
