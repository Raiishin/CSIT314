import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import SeatMapper from './SeatMapper';
import VisaLogo from '../assets/visa.png';
import MastercardLogo from '../assets/mastercard.png';
import AmexLogo from '../assets/amex.png';
import DiscoverLogo from '../assets/discover.png';
//import SeatingPlanForm from './SeatingPlanForm';

const TicketPurchase = ({ movie }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCVV] = useState('');

  const [showSeatingPlan, setShowSeatingPlan] = useState(false);
  const [seatingPlan, setSeatingPlan] = useState([]);
  const [loadingSeatingPlan, setLoadingSeatingPlan] = useState(false);

  // const handleSeatSelection = seat => {
  //   const seatString = `${seat.seatRow}${seat.seatNumber}`;
  //   if (selectedSeats.includes(seatString)) {
  //     setSelectedSeats(selectedSeats.filter(s => s !== seatString));
  //   } else {
  //     setSelectedSeats([...selectedSeats, seatString]);
  //   }
  // };

  const handleSeatSelection = seat => {
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

  // const handleSeatSelection = (seatRow, seatNumber) => {
  //   const seat = { seatRow, seatNumber };
  //   setSelectedSeats(prevSelectedSeats => {
  //     const seatIndex = prevSelectedSeats.findIndex(
  //       seat => seat.seatRow === seatRow && seat.seatNumber === seatNumber
  //     );
  //     if (seatIndex > -1) {
  //       return [
  //         ...prevSelectedSeats.slice(0, seatIndex),
  //         ...prevSelectedSeats.slice(seatIndex + 1)
  //       ];
  //     } else {
  //       return [...prevSelectedSeats, seat];
  //     }
  //   });
  // };

  const handleDateSelection = dateTime => {
    setSelectedDate(dateTime);
  };

  const handleTimeSelection = dateTime => {
    setSelectedTime(dateTime);
  };

  const handleTheaterSelection = theater => {
    setSelectedTheater(theater);
  };

  const handlePaymentMethodSelection = paymentMethod => {
    setSelectedPaymentMethod(paymentMethod);
  };

  // const handlePaymentInfoChange = event => {
  //   const { name, value } = event.target;
  //   setPaymentInfo(prevPaymentInfo => ({
  //     ...prevPaymentInfo,
  //     [name]: value
  //   }));
  // };

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: Handle payment logic based on selected payment method
  };

  const calculateTotalPrice = () => {
    const pricePerSeat = 10; // Assume $10 per seat
    return selectedSeats.length * pricePerSeat;
  };

  // const handleViewSeatingPlanClick = () => {
  //   // TODO: Implement logic to show seating plan based on selected date, time, and theater
  //   alert(`Showing seating plan for ${selectedDate} ${selectedTime} at ${selectedTheater}`);
  //   fetch(`/api/seatingPlan?date=${selectedDate}&time=${selectedTime}&theater=${selectedTheater}`)
  //     .then(response => response.json())
  //     .then(data => setSeatingPlan(data));
  // };

  // useEffect(() => {
  //   if (selectedDate && selectedTime && selectedTheater) {
  //     setShowSeatingPlan(true);
  //     fetch(`/api/seatingPlan?date=${selectedDate}&time=${selectedTime}&theater=${selectedTheater}`)
  //       .then(response => response.json())
  //       .then(data => setSeatingPlan(data));
  //   } else {
  //     setShowSeatingPlan(false);
  //     //alert('Please select date, time, and theater first');
  //   }
  // }, [selectedDate, selectedTime, selectedTheater]);

  const handleViewSeatingPlanClick = () => {
    alert(`Showing seating plan for ${selectedDate} ${selectedTime} at ${selectedTheater}`);
    //setLoadingSeatingPlan(true);
    //fetch(`/api/seatingPlan?date=${selectedDate}&time=${selectedTime}&theater=${selectedTheater}`);
    fetch('seatData.json')
      .then(response => response.json())
      .then(data => {
        setSeatingPlan(data);
        setShowSeatingPlan(true);
        setLoadingSeatingPlan(false);
      })
      .catch(error => console.error('Error fetching seat data:', error));
    // const filteredSeats = selectedSeats.filter(
    //   seat =>
    //     seat.date === selectedDate && seat.time === selectedTime && seat.theatre === selectedTheater
    // );
  };
  useEffect(() => {
    setShowSeatingPlan(false);
  }, [selectedDate, selectedTime, selectedTheater]);

  // credit card handlers
  const handleCardNumberChange = e => {
    let formattedNumber = e.target.value.replace(/\s/g, '');
    if (cardType === 'amex') {
      formattedNumber = formattedNumber.slice(0, 15);
    } else {
      formattedNumber = formattedNumber.slice(0, 16);
    }
    formattedNumber = formattedNumber.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedNumber);
  };

  const handleCardHolderChange = e => {
    setCardHolder(e.target.value);
  };

  const handleExpirationChange = e => {
    let formattedExpiration = e.target.value.replace(/[^0-9]/g, '');
    if (formattedExpiration.length > 6) {
      formattedExpiration = formattedExpiration.slice(0, 6);
    }
    if (formattedExpiration.length >= 3) {
      formattedExpiration = formattedExpiration.slice(0, 2) + '/' + formattedExpiration.slice(2);
    }
    setExpiration(formattedExpiration);
  };

  const handleCVVChange = e => {
    let formattedCVV = e.target.value.replace(/[^0-9]/g, '');
    if (cardType === 'amex') {
      formattedCVV = formattedCVV.slice(0, 4);
    } else {
      formattedCVV = formattedCVV.slice(0, 3);
    }
    setCVV(formattedCVV);
  };

  const getCardType = cardNumber => {
    const cardTypes = [
      {
        type: 'visa',
        pattern: /^4/
      },
      {
        type: 'mastercard',
        pattern: /^5[1-5]/
      },
      {
        type: 'amex',
        pattern: /^3[47]/
      },
      {
        type: 'discover',
        pattern: /^6(?:011|5[0-9]{2})/
      }
    ];

    for (const cardType of cardTypes) {
      if (cardNumber.match(cardType.pattern)) {
        return cardType.type;
      }
    }

    return '';
  };

  const getCardLogo = cardType => {
    switch (cardType) {
      case 'visa':
        return VisaLogo;
      case 'mastercard':
        return MastercardLogo;
      case 'amex':
        return AmexLogo;
      case 'discover':
        return DiscoverLogo;
      default:
        return null;
    }
  };

  const cardType = getCardType(cardNumber);

  //const totalSelectedSeats = selectedSeats.length;
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
            <h1 className="text-3xl font-bold mb-4">Movie Title</h1>
            <img src="https://via.placeholder.com/500x750" alt="Movie Poster" className="mb-4" />
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lobortis
              dolor. Sed euismod bibendum mauris, eu molestie mauris bibendum ac. Duis vehicula
              consectetur velit eu interdum.
            </p>
          </div>
          <>
            <div>
              <p className="text-gray-600 font-bold">Date</p>
              <select
                id="date"
                name="date"
                value={selectedDate}
                onChange={e => handleDateSelection(e.target.value)}
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
                value={selectedTime}
                onChange={e => handleTimeSelection(e.target.value)}
                disabled={!selectedDate}
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
                value={selectedTheater}
                onChange={e => handleTheaterSelection(e.target.value)}
                disabled={!selectedTime}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">Select a theater</option>
                <option value="Theater 1">Theater 1</option>
                <option value="Theater 2">Theater 2</option>
                <option value="Theater 3">Theater 3</option>
              </select>
              <div>
                <button
                  className="bg-gray-200 text-white font-bold py-2 px-4 rounded mt-8 enabled:bg-cyan-600"
                  disabled={!selectedDate || !selectedTheater || !selectedTime}
                  onClick={handleViewSeatingPlanClick}>
                  View Seating Plan
                </button>
              </div>
            </div>
          </>

          <div className="md:w-1/2 flex flex-col items-center">
            <div className="bg-gray-200 py-0 mt-8 flex justify-center items-center">
              <div className="w-1/2 flex justify-center items-center">
                <div className="w-80 h-10 bg-white border border-cyan-400 flex justify-center items-center">
                  <p className="text-gray-600 text-lg font-bold">Screen</p>
                </div>
              </div>
            </div>

            {/* <SeatMapper
              selectedSeats={selectedSeats}
              onSeatSelection={handleSeatSelection}
              seatingPlan={seatingPlan}
            /> */}

            {showSeatingPlan && (
              <SeatMapper
                selectedSeats={selectedSeats}
                onSeatSelection={handleSeatSelection}
                seatingPlan={seatingPlan}
              />
            )}

            {/* <div className="mt-8">
              <div className="bg-gray-200 text-black font-bold py-2 px-4 rounded">
                Total Tickets: {selectedSeats.length} (Seats:{' '}
                {selectedSeats.map(seat => `${seat.seatRow}${seat.seatNumber}`).join(', ')})
                {calculateTotalPrice()}
              </div>
            </div> */}

            {/* <div className="bg-gray-200 py-0">
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
            </div> */}

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
                  <option value="DBS">PayLah! / PayNow</option>
                </select>
              </div>
            </div>
            {selectedPaymentMethod === 'credit-card' && (
              <div className="flex flex-col items-center mt-8">
                <div className="bg-gray-100 p-8 rounded w-96 mb-4">
                  <h2 className="text-2xl mb-4">Credit Card Preview</h2>
                  <div className="bg-white p-4 rounded">
                    {cardType && (
                      <div className="flex items-center mt-4">
                        <img
                          src={getCardLogo(cardType)}
                          alt={cardType.type}
                          className="w-8 h-8 mr-2"
                        />
                        <span className="text-sm font-bold capitalize">{cardType.type}</span>
                      </div>
                    )}
                    <div className="flex justify-between mb-4">
                      <div className="text-lg font-bold">
                        {cardHolder ? cardHolder : 'Cardholder Name'}
                      </div>
                      <div className="text-lg font-bold">{expiration ? expiration : 'MM/YY'}</div>
                    </div>
                    <div className="text-xl font-bold mb-4">
                      {cardNumber ? cardNumber : '**** **** **** ****'}
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm">CVV</div>
                      <div className="text-sm">{cvv ? cvv : '***'}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow p-8 rounded w-96">
                  <h2 className="text-2xl mb-4">Credit Card Information</h2>
                  <form className="group">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="cardNumber">
                        Card Number
                      </label>
                      <input
                        className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:shadow-outline"
                        id="cardNumber"
                        type="text"
                        placeholder="Enter card number"
                        value={cardNumber}
                        required
                        onChange={handleCardNumberChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="cardHolder">
                        Card Holder
                      </label>
                      <input
                        className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:shadow-outline"
                        id="cardHolder"
                        type="text"
                        placeholder="Enter card holder name"
                        value={cardHolder}
                        required
                        onChange={handleCardHolderChange}
                      />
                    </div>
                    <div className="flex justify-between mb-4">
                      <div className="w-1/2 mr-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="expiration">
                          Expiration Date
                        </label>
                        <input
                          className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:shadow-outline"
                          id="expiration"
                          type="text"
                          placeholder="MM/YYYY"
                          value={expiration}
                          required
                          onChange={handleExpirationChange}
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                          CVV
                        </label>
                        <input
                          className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:shadow-outline"
                          id="cvv"
                          type="text"
                          placeholder="Enter CVV"
                          value={cvv}
                          required
                          onChange={handleCVVChange}
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <button
                        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline group-invalid:pointer-events-none group-invalid:opacity-30"
                        type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {selectedPaymentMethod === 'DBS' && (
              <div className="mt-4 text-center">
                <img
                  src="https://i0.wp.com/legendagesingapore.com/wp-content/uploads/2020/09/DBS-icon.png?resize=300%2C119&ssl=1"
                  alt="PayLah/PayNow"
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
