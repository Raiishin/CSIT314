import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import SeatMapper from './SeatMapper';

const TicketPurchase = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const handleSeatSelection = seat => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handlePaymentInfoChange = event => {
    const { name, value } = event.target;
    setPaymentInfo(prevPaymentInfo => ({
      ...prevPaymentInfo,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: Handle payment logic
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <FaArrowLeft className="text-gray-600 mr-2" />
            <span className="text-gray-600 hover:text-gray-800 cursor-pointer">Back</span>
          </div>
          <h1 className="text-2xl font-bold">Ticket Purchase</h1>
          <div></div>
        </div>
      </div>
      <div className="container mx-auto py-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Movie Title</h1>
          <img src="https://via.placeholder.com/500x750" alt="Movie Poster" className="mb-4" />
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lobortis
            dolor. Sed euismod bibendum mauris, eu molestie mauris bibendum ac. Duis vehicula
            consectetur velit eu interdum.
          </p>
          <div className="flex justify-between w-full mb-4">
            <div>
              <p className="text-gray-600 font-bold">Date</p>
              <p className="text-gray-600">May 24, 2023</p>
            </div>
            <div>
              <p className="text-gray-600 font-bold">Time</p>
              <p className="text-gray-600">8:00 PM</p>
            </div>
            <div>
              <p className="text-gray-600 font-bold">Theater</p>
              <p className="text-gray-600">Theater 1</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="bg-gray-200 py-0 mt-8 flex justify-center items-center">
            <div className="w-1/2 flex justify-center items-center">
              <div className="w-80 h-10 bg-white border border-cyan-400 flex justify-center items-center">
                <p className="text-gray-600 text-lg font-bold">Screen</p>
              </div>
            </div>
          </div>

          <SeatMapper selectedSeats={selectedSeats} onSeatSelection={handleSeatSelection} />
          <div className="mt-8">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
              Purchase
            </button>
          </div>

          <div className="bg-gray-200 py-0">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold mb-4">Selected Seats:</h2>
              <div className="flex flex-wrap justify-center">
                {selectedSeats.length === 0 && <p className="text-gray-600">No seats selected</p>}
                {selectedSeats.map(seat => (
                  <div
                    key={seat}
                    className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-2 mb-2">
                    <p className="text-cyan-400 font-bold">{seat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Payment Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 font-bold mb-2">
                Card Number
              </label>

              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentInfoChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cardName" className="block text-gray-700 font-bold mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={paymentInfo.cardName}
                onChange={handlePaymentInfoChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label htmlFor="expiryMonth" className="block text-gray-700 font-bold mb-2">
                  Expiry Month
                </label>
                <input
                  type="text"
                  id="expiryMonth"
                  name="expiryMonth"
                  value={paymentInfo.expiryMonth}
                  onChange={handlePaymentInfoChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="w-1/2 ml-2">
                <label htmlFor="expiryYear" className="block text-gray-700 font-bold mb-2">
                  Expiry Year
                </label>
                <input
                  type="text"
                  id="expiryYear"
                  name="expiryYear"
                  value={paymentInfo.expiryYear}
                  onChange={handlePaymentInfoChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="cvv" className="block text-gray-700 font-bold mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handlePaymentInfoChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex justify-end">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                Submit Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchase;
