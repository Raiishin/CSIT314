import React, { useState } from 'react';

const CheckPurchase = () => {
  const [inputValue, setInputValue] = useState('');
  const [movieName, setMovieName] = useState('');
  const [seats, setSeats] = useState([]);
  const [showTime, setShowTime] = useState('');
  const [cinema, setCinema] = useState('');
  const [purchaseFound, setPurchaseFound] = useState(true);
  // conditions for search button to be enabled:
  // remove the - after {10} if it is not needed.
  const isValidInput = /^[0-9]{10}-[0-9]{4}$/.test(inputValue);
  const isSearchDisabled = !isValidInput;

  const handleInputChange = event => {
    const value = event.target.value;
    let formattedValue = value.replace(/[^0-9]/g, '').slice(0, 14);

    // Add hyphen after 10 digits. Remove if not needed
    if (formattedValue.length > 10) {
      formattedValue = formattedValue.replace(/^(\d{10})/, '$1-');
    }

    setInputValue(formattedValue);
  };

  const handleSearch = () => {
    // Here, you can make an API call or fetch data from your backend
    // using the email address or contact number to retrieve the purchase details
    // Replace the following code with your actual logic

    // Mock data for demonstration purposes
    const mockData = {
      movieName: 'Avengers: Endgame',
      seats: ['A1', 'A2', 'A3'],
      showTime: '18:00',
      cinema: 'Cinema 1'
    };

    // Update the state with retrieved data
    if (mockData) {
      // Purchase data found
      setMovieName(mockData.movieName);
      setSeats(mockData.seats);
      setShowTime(mockData.showTime);
      setCinema(mockData.cinema);
      setPurchaseFound(true);
    } else {
      // No purchase data found
      setMovieName('');
      setSeats([]);
      setShowTime('');
      setCinema('');
      setPurchaseFound(false);
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
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <button style={styles.quickBuyButtonBlue} onClick={handleSearch} disabled={isSearchDisabled}>
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
