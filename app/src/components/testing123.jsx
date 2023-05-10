import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import SeatMapper from './SeatMapper';

const TicketPurchase = ({ movie }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
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

  const handleDateTimeSelection = dateTime => {
    setSelectedDateTime(dateTime);
  };

  const handlePaymentMethodSelection = paymentMethod => {
    setSelectedPaymentMethod(paymentMethod);
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
    // TODO: Handle payment logic based on selected payment method
  };

  const calculateTotalPrice = () => {
    const pricePerSeat = 10; // Assume $10 per seat
    return selectedSeats.length * pricePerSeat;
  };

  return (
    <>
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
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <img src={movie.poster} alt="Movie Poster" className="mb-4" />
            <p className="text-gray-600 mb-4">{movie.description}</p>
            <div className="flex justify-between w-full mb-4">
              <div>
                <label htmlFor="date" className="text-gray-600 font-bold">
                  Date
                </label>
                <select
                  id="date"
                  name="date"
                  value={selectedDateTime}
                  onChange={handleDateTimeSelection}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select a date</option>
                  <option value="2023-05-24">May 24, 2023</option>
                  <option value="2023-05-25">May 25, 2023</option>
                  <option value="2023-05-26">May 26, 2023</option>
                  <option value="2023-05-27">May 27, 2023</option>
                </select>
              </div>
              <div>
                <label htmlFor="time" className="text-gray-600 font-bold">
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={selectedDateTime}
                  onChange={handleDateTimeSelection}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select a time</option>
                  <option value="08:00 PM">8:00 PM</option>
                  <option value="09:00 PM">9:00 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                </select>
              </div>
              <div>
                <label htmlFor="theater" className="text-gray-600 font-bold">
                  Theater
                </label>
                <select
                  id="theater"
                  name="theater"
                  value={selectedDateTime}
                  onChange={handleDateTimeSelection}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select a theater</option>
                  <option value="Theater 1">Theater 1</option>
                  <option value="Theater 2">Theater 2</option>
                  <option value="Theater 3">Theater 3</option>
                </select>
              </div>

              <div>
                <p className="text-gray-600 font-bold">Theater</p>
                <p className="text-gray-600">{movie.theater}</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col items-center">
            <div className="bg-gray-200 py-0 mt-8 flex justify-center items-center">
              <div className="w-1/2 flex justify-center items-center">
                <div className="w-80 h-10             bg-white border border-cyan-400 flex justify-center items-center">
                  <p className="text-gray-600 text-lg font-bold">Screen</p>
                </div>
              </div>
            </div>

            <SeatMapper selectedSeats={selectedSeats} onSeatSelection={handleSeatSelection} />
            <div className="mt-8">
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
                Purchase ({selectedSeats.length} seats for ${calculateTotalPrice()})
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

            <h2 className="text-2xl font-bold mt-8 mb-4">Date and Time Selection</h2>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                  Date
                </label>

                <input
                  type="date"
                  id="date"
                  name="date"
                  value={selectedDateTime}
                  onChange={e => handleDateTimeSelection(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block text-gray-700 font-bold mb-2">
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={selectedDateTime}
                  onChange={e => handleDateTimeSelection(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select a time</option>
                  {movie.showtimes.map(time => (
                    <option key={time} value={`${movie.date} ${time}`}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Payment Information</h2>
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <label htmlFor="paymentMethod" className="block text-gray-700 font-bold mb-2">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={selectedPaymentMethod}
                  onChange={e => handlePaymentMethodSelection(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">Select a payment method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>
            {selectedPaymentMethod === 'credit-card' && (
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
            )}

            {selectedPaymentMethod === 'paypal' && (
              <div className="mt-4 text-center">
                <img
                  src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png"
                  alt="PayPal"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TicketPurchase;
