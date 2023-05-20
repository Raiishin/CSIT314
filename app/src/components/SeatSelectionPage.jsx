import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaChair } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { getSeatmap, purchaseSeats } from '../api/movies';

import VisaLogo from '../assets/visa.png';
import MastercardLogo from '../assets/mastercard.png';
import AmexLogo from '../assets/amex.png';
import DiscoverLogo from '../assets/discover.png';

const SeatSelectionPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
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

  const params = useParams();

  const handleReadyForPayment = async () => {
    const response = await purchaseSeats(params.id, selectedSeats);
    console.log(response);
    // setShowPaymentPart(true);
  };

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const { seatMap, date, showtime } = await getSeatmap(params.id);

        setSeatData(seatMap);
        setSelectedDate(date);
        setSelectedTime(showtime);

        setShowRestOfPage(true);
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
            <FaArrowLeft className="text-dark-gray mr-2" />
            {/* back to view movie details page */}
            <span className="text-gray-400 hover:text-gray-800 cursor-pointer">Back</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl text-center font-bold">Ticket Purchase</h1>

      <div className="flex flex-row place-content-center justify-around">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <p className="text-dark-gray font-bold">Date: {selectedDate}</p>
            <p className="text-dark-gray font-bold">Time: {selectedTime}</p>
          </div>
          <h1 className="text-3xl font-bold mb-4">Movie Title</h1>
          <img src="https://via.placeholder.com/500x500" alt="Movie Poster" />
        </div>

        {showRestOfPage && (
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 py-0 mt-8 flex justify-center items-center mb-4">
              <div className="w-1/2 flex justify-center items-center">
                <div className="w-80 h-10 bg-white border border-cyan-400 flex justify-center items-center">
                  <p className="text-dark-gray text-lg font-bold">Screen</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="grid grid-cols-10 gap-4">
                {seatData.map(seat => (
                  <div
                    key={`${seat.seatRow}-${seat.seatNumber}`}
                    title={`${seat.seatRow}-${seat.seatNumber}: ${seat.status}`}
                    className={`flex justify-center items-center w-8 h-8 m-1 cursor-pointer ${
                      seat.status.toLowerCase() === 'available' &&
                      isSeatSelected(seat.seatRow, seat.seatNumber)
                        ? 'bg-cyan'
                        : seat.status.toLowerCase() === 'unavailable'
                        ? 'bg-red'
                        : seat.status.toLowerCase() === 'sold'
                        ? 'bg-dark-gray'
                        : 'bg-light-gray'
                    }`}
                    onClick={() => handleSeatSelection(seat.seatRow, seat.seatNumber)}
                    role="button"
                    aria-pressed={isSeatSelected(seat.seatRow, seat.seatNumber)}
                  >
                    <FaChair />
                    <span className="sr-only">{`Seat ${seat.seatRow}-${seat.seatNumber} ${
                      isSeatSelected(seat.seatRow, seat.seatNumber) ? 'selected' : 'unselected'
                    }`}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-4">
                <div className="flex items-center mx-4">
                  <div className="w-4 h-4 bg-light-gray rounded-full"></div>
                  <span className="ml-2">Available</span>
                </div>
                <div className="flex items-center mx-4">
                  <div className="w-4 h-4 bg-cyan rounded-full"></div>
                  <span className="ml-2">Selected</span>
                </div>
                <div className="flex items-center mx-4">
                  <div className="w-4 h-4 bg-red rounded-full"></div>
                  <span className="ml-2">Unavailable</span>
                </div>
                <div className="flex items-center mx-4">
                  <div className="w-4 h-4 bg-dark-gray rounded-full"></div>
                  <span className="ml-2">Sold</span>
                </div>
              </div>

              <div className="bg-gray-200 w-full">
                <h2 className="text-xl mb-4">Selected Seats:</h2>
                <div className="flex flex-wrap justify-center">
                  {selectedSeats.length === 0 && <p className="text-dark-gray">None</p>}
                  {selectedSeats.map((seat, index) => (
                    <div
                      key={index}
                      className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-2 mb-2"
                    >
                      <p className="text-black-400 font-bold">{`${seat.seatRow}${seat.seatNumber}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mt-8">
                <div className="bg-gray-200 text-black font-bold py-2 px-4 rounded">
                  Total Tickets: {selectedSeats.length} (Seats:{' '}
                  {selectedSeats.map(seat => `${seat.seatRow}${seat.seatNumber}`).join(', ')})
                </div>

                <div className="flex place-content-center">
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
                            className="w-16"
                          >
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
                            className="w-16"
                          >
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
                            className="w-16"
                          >
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
                  <div className="mr-8">
                    <input
                      className="hidden"
                      type="radio"
                      id="none"
                      name="foodOption"
                      value=""
                      checked={foodOption === 'none'}
                      onChange={e => setFoodOption(e.target.id)}
                    />
                    <label
                      className={`flex flex-col p-4 border-2 border-gray-400 cursor-pointer ${
                        foodOption === 'none' ? 'bg-light-gray' : ''
                      }`}
                      htmlFor="none"
                      style={{ width: '100px', height: '225px' }}
                    >
                      <span className="text-xs font-semibold uppercase">None</span>
                      <img src="none.png" alt="None" className="h-14" />
                    </label>
                  </div>
                  <div className="mr-8">
                    <input
                      className="hidden"
                      type="radio"
                      id="popcorn"
                      name="foodOption"
                      value="popcorn_drinks"
                      checked={foodOption === 'popcorn'}
                      onChange={e => setFoodOption(e.target.id)}
                    />
                    <label
                      className={`flex flex-col p-4 border-2 border-gray-400 cursor-pointer ${
                        foodOption === 'popcorn' ? 'bg-light-gray' : ''
                      }`}
                      htmlFor="popcorn"
                      style={{ width: '100px', height: '225px' }}
                    >
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
                    <div className="mr-8">
                      <input
                        className="hidden"
                        type="radio"
                        id="nachos"
                        name="foodOption"
                        value="nachos_drinks"
                        checked={foodOption === 'nachos'}
                        onChange={e => setFoodOption(e.target.id)}
                      />
                      <label
                        className={`flex flex-col p-4 border-2 border-gray-400 cursor-pointer ${
                          foodOption === 'nachos' ? 'bg-light-gray' : ''
                        }`}
                        htmlFor="nachos"
                        style={{ width: '100px', height: '225px' }}
                      >
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
                    <div className="mr-8">
                      <input
                        className="hidden"
                        type="radio"
                        id="FamilyCombo"
                        name="foodOption"
                        value="FamilyCombo"
                        checked={foodOption === 'FamilyCombo'}
                        onChange={e => setFoodOption(e.target.id)}
                      />
                      <label
                        className={`flex flex-col p-4 border-2 border-gray-400 cursor-pointer ${
                          foodOption === 'FamilyCombo' ? 'bg-light-gray' : ''
                        }`}
                        htmlFor="FamilyCombo"
                        style={{ width: '100px', height: '225px' }}
                      >
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
                className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border-2 border-light-gray"
                //   disabled={!selectedDate || !selectedTheater || !selectedTime}
                onClick={handleReadyForPayment}
              >
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
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
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
                            htmlFor="cardNumber"
                          >
                            Card Number
                          </label>
                          <input
                            className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan focus:shadow-outline"
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
                            htmlFor="cardHolder"
                          >
                            Card Holder
                          </label>
                          <input
                            className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan focus:shadow-outline"
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
                              htmlFor="expiration"
                            >
                              Expiration Date
                            </label>
                            <input
                              className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan focus:shadow-outline"
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
                              htmlFor="cvv"
                            >
                              CVV
                            </label>
                            <input
                              className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan focus:shadow-outline"
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
                            className="bg-cyan hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline group-invalid:pointer-events-none group-invalid:opacity-30"
                            type="submit"
                            onClick={handleSubmit}
                          >
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

export default SeatSelectionPage;
