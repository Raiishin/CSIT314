import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaChair } from 'react-icons/fa';

import VisaLogo from '../assets/visa.png';
import MastercardLogo from '../assets/mastercard.png';
import AmexLogo from '../assets/amex.png';
import DiscoverLogo from '../assets/discover.png';

const MainSeatsPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  // const [selectedTheater, setSelectedTheater] = useState('');
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [adultQuantity, setAdultQuantity] = useState(0);
  const [childrenQuantity, setChildrenQuantity] = useState(0);
  const [seniorQuantity, setSeniorQuantity] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCVV] = useState('');
  const [foodOption, setFoodOption] = useState('none');
  const [showRestOfPage, setShowRestOfPage] = useState(false);
  const [showPaymentPart, setShowPaymentPart] = useState(false);

  const handleFoodOptionChange = event => {
    setFoodOption(event.target.id);
    // can also use e.target.id
  };

  const handleDateSelection = dateTime => {
    setSelectedDate(dateTime);
  };

  const handleTimeSelection = dateTime => {
    setSelectedTime(dateTime);
  };

  // const handleTheaterSelection = theater => {
  //   setSelectedTheater(theater);
  // };

  const handleReadyForPayment = () => {
    setShowPaymentPart(true);
  };

  const handleViewSeatingPlanClick = () => {
    // alert(`Showing seating plan for ${selectedDate} ${selectedTime} at ${selectedTheater}`);
    alert(`Showing seating plan for ${selectedDate} at ${selectedTime}`);
    //setLoadingSeatingPlan(true);
    //fetch(`/api/seatingPlan?date=${selectedDate}&time=${selectedTime}&theater=${selectedTheater}`);
    const fetchSeats = async () => {
      try {
        const response = await fetch('seatData.json');
        const data = await response.json();
        setSeatData(data);
        setShowRestOfPage(true);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };
    fetchSeats();
  };

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

  const handlePaymentMethodSelection = paymentMethod => {
    setSelectedPaymentMethod(paymentMethod);
  };
  const handleSubmit = event => {
    event.preventDefault();
    // TODO: Handle payment logic based on selected payment method
  };

  const calculatePrice = (quantity, price) => {
    const totalTixPrice = parseInt(quantity, 10) * parseInt(price, 10);
    return totalTixPrice;
  };

  const adultPrice = 10;
  const childrenPrice = 9;
  const seniorPrice = 8.5;

  const totalTixPrice =
    calculatePrice(adultQuantity, adultPrice) +
    calculatePrice(childrenQuantity, childrenPrice) +
    calculatePrice(seniorQuantity, seniorPrice);

  const calculateFood = food => {
    let foodPrice = 0;
    if (food === 'popcorn') {
      foodPrice = 11;
    } else if (food === 'nachos') {
      foodPrice = 14;
    } else if (food === 'FamilyCombo') {
      foodPrice = 30;
    }
    return foodPrice;
  };
  const totalOrderPrice = totalTixPrice + calculateFood(foodOption);

  // credit card handlers below

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <FaArrowLeft className="text-gray-600 mr-2" />
            {/* back to view movie details page */}
            <span className="text-gray-400 hover:text-gray-800 cursor-pointer">Back</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl text-center font-bold">Ticket Purchase</h1>
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
            {/* <p className="text-gray-600 font-bold">Theater</p>
            <select
              id="theater"
              name="theater"
              value={selectedTheater}
              onChange={e => handleTheaterSelection(e.target.value)}
              disabled={!selectedTime + !selectedDate}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select a theater</option>
              <option value="Theater 1">Theater 1</option>
              <option value="Theater 2">Theater 2</option>
              <option value="Theater 3">Theater 3</option>
            </select> */}
            <div>
              <button
                className="bg-gray-200 text-white font-bold py-2 px-4 rounded mt-8 enabled:bg-cyan-600"
                disabled={!selectedDate || !selectedTime}
                onClick={handleViewSeatingPlanClick}>
                View Seating Plan
              </button>
            </div>
          </div>
        </>

        {showRestOfPage && (
          <div className="md:w-1/2 flex flex-col items-center">
            <div className="bg-gray-200 py-0 mt-8 flex justify-center items-center">
              <div className="w-1/2 flex justify-center items-center">
                <div className="w-80 h-10 bg-white border border-cyan-400 flex justify-center items-center">
                  <p className="text-gray-600 text-lg font-bold">Screen</p>
                </div>
              </div>
            </div>

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

              {/* <div className="mt-8">
                <div className="bg-gray-200 text-black font-bold py-2 px-4 rounded">
                  Total Tickets: {selectedSeats.length} (Seats:{' '}
                  {selectedSeats.map(seat => `${seat.seatRow}${seat.seatNumber}`).join(', ')})
                </div>
              </div> */}
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
            </div>

            <div className="mt-6">
              <div className="mt-8">
                <div className="bg-gray-200 text-black font-bold py-2 px-4 rounded">
                  Total Tickets: {selectedSeats.length} (Seats:{' '}
                  {selectedSeats.map(seat => `${seat.seatRow}${seat.seatNumber}`).join(', ')})
                </div>
                <div>
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Ticket Type</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">Adult</td>
                        <td className="px-4 py-2">
                          <select
                            id="adultQuantity"
                            value={adultQuantity}
                            onChange={e => handleAdultQuantityChange(Number(e.target.value))}
                            className="w-16">
                            {Array.from({ length: totalSelectedSeats + 1 }).map((_, index) => (
                              <option key={index} value={index}>
                                {index}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-2">${calculatePrice(adultQuantity, adultPrice)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Children</td>
                        <td className="px-4 py-2">
                          <select
                            id="childrenQuantity"
                            value={childrenQuantity}
                            onChange={e => handleChildrenQuantityChange(Number(e.target.value))}
                            className="w-16">
                            {Array.from({ length: totalSelectedSeats - adultQuantity + 1 }).map(
                              (_, index) => (
                                <option key={index} value={index}>
                                  {index}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          ${calculatePrice(childrenQuantity, childrenPrice)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Senior</td>
                        <td className="px-4 py-2">
                          <select
                            id="seniorQuantity"
                            value={seniorQuantity}
                            onChange={e => handleSeniorQuantityChange(Number(e.target.value))}
                            className="w-16">
                            {Array.from({
                              length: totalSelectedSeats - adultQuantity - childrenQuantity + 1
                            }).map((_, index) => (
                              <option key={index} value={index}>
                                {index}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          ${calculatePrice(seniorQuantity, seniorPrice)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="px-4 py-2" colSpan="2">
                          <strong>Total Ticket Price:</strong>
                        </td>
                        <td className="px-4 py-2">${totalTixPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* stuff gets pushed arnd if too many seats are selected... */}
              <span className="font-bold">Food Options:</span>
              <form className="grid grid-cols-3 gap-2 w-full max-w-screen-sm">
                <div className="flex items-center mt-2">
                  <div className="mr-10">
                    <input
                      className="hidden"
                      type="radio"
                      id="none"
                      name="foodOption"
                      value=""
                      checked={foodOption === 'none'}
                      onChange={handleFoodOptionChange}
                    />
                    <label
                      className={`flex flex-col p-4 border-2 border-gray-400 cursor-pointer ${
                        foodOption === 'none' ? 'bg-gray-300' : ''
                      }`}
                      htmlFor="none"
                      style={{ width: '100px', height: '225px' }}>
                      <span className="text-xs font-semibold uppercase">None</span>
                      <img src="none.png" alt="None" className="h-14" />
                      {/* <span className="text-xl font-bold mt-2">test</span>
                      <ul className="text-sm mt-2">
                        <li>Thing 1</li>
                        <li>Thing 2</li>
                      </ul> */}
                    </label>
                  </div>
                  <div className="mr-10">
                    <input
                      className="hidden"
                      type="radio"
                      id="popcorn"
                      name="foodOption"
                      value="popcorn_drinks"
                      checked={foodOption === 'popcorn'}
                      onChange={handleFoodOptionChange}
                    />
                    <label
                      className={`flex flex-col p-4 border-2 border-gray-400 cursor-pointer ${
                        foodOption === 'popcorn' ? 'bg-gray-300' : ''
                      }`}
                      htmlFor="popcorn"
                      style={{ width: '100px', height: '225px' }}>
                      <span className="text-xs font-semibold uppercase">Combo 1</span>
                      <img src="popcorn.png" alt="Popcorn" className="h-14" />
                      <span className="text-xl font-bold mt-2">$11</span>
                      <ul className="text-sm mt-2">
                        <li>1x Large Popcorn</li>
                        <li>1x Drinks</li>
                      </ul>
                    </label>
                  </div>
                  <div>
                    <div className="mr-10">
                      <input
                        className="hidden"
                        type="radio"
                        id="nachos"
                        name="foodOption"
                        value="nachos_drinks"
                        checked={foodOption === 'nachos'}
                        onChange={handleFoodOptionChange}
                      />
                      <label
                        className={`flex flex-col p-4 border-2 border-gray-400 cursor-pointer ${
                          foodOption === 'nachos' ? 'bg-gray-300' : ''
                        }`}
                        htmlFor="nachos"
                        style={{ width: '100px', height: '225px' }}>
                        <span className="text-xs font-semibold uppercase">Combo 2</span>
                        <img src="nachos.png" alt="Nachos" className="h-14" />
                        <span className="text-xl font-bold mt-2">$14</span>
                        <ul className="text-sm mt-2">
                          <li>1x Nachos</li>
                          <li>1x Drinks</li>
                        </ul>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="mr-10">
                      <input
                        className="hidden"
                        type="radio"
                        id="FamilyCombo"
                        name="foodOption"
                        value="FamilyCombo"
                        checked={foodOption === 'FamilyCombo'}
                        onChange={handleFoodOptionChange}
                      />
                      <label
                        className={`flex flex-col p-4 border-2 border-gray-400 cursor-pointer ${
                          foodOption === 'FamilyCombo' ? 'bg-gray-300' : ''
                        }`}
                        htmlFor="FamilyCombo"
                        style={{ width: '100px', height: '225px' }}>
                        <span className="text-xs font-semibold uppercase">Family Combo</span>
                        <img src="FamilyCombo.jpg" alt="FamilyCombo" className="h-14" />
                        <span className="text-xl font-bold mt-2">$30</span>
                        <ul className="text-sm mt-2">
                          <li>2x Large Popcorn</li>
                          <li>1x Nachos</li>
                          <li>3x Drinks</li>
                        </ul>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              {/* Total price */}
              <div className="mt-4">
                <span className="text-xl font-bold">Total Order Price: </span>
                <span className="text-xl font-bold">${totalOrderPrice}</span>
              </div>
            </div>

            <div>
              <button
                className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border-2 border-gray-300"
                //   disabled={!selectedDate || !selectedTheater || !selectedTime}
                onClick={handleReadyForPayment}>
                Ready for Payment?
              </button>
            </div>

            {/* hide payment part until user is ready for payment */}
            {showPaymentPart && (
              <>
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
                  <div className="flex flex-col items-center mt-2">
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
                          <div className="text-lg font-bold">
                            {expiration ? expiration : 'MM/YY'}
                          </div>
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
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="cvv">
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSeatsPage;
