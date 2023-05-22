import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaChair } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { getSeatmap } from '../api/movies';

import NoneLogo from '../assets/none.png';
import PopcornIcon from '../assets/popcorn.png';
import NachosIcon from '../assets/nachos.png';
import FamilyComboIcon from '../assets/familyCombo.jpg';
import useGlobalStore from '../store/globalStore';

import Payment from './Payment';

const SeatSelectionPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [adultQuantity, setAdultQuantity] = useState(0);
  const [childrenQuantity, setChildrenQuantity] = useState(0);
  const [seniorQuantity, setSeniorQuantity] = useState(0);

  const [foodOption, setFoodOption] = useState('none');
  const [showRestOfPage, setShowRestOfPage] = useState(false);
  const [showPaymentPart, setShowPaymentPart] = useState(false);

  const params = useParams();

  const userId = useGlobalStore(state => state.userId);

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

              <span className="font-bold">Food Options:</span>
              <form>
                <div className="flex items-center m-2 flex-row grid grid-cols-4">
                  <div>
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
                      <img src={NoneLogo} alt="None" className="h-14" />
                    </label>
                  </div>
                  <div>
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
                      <img src={PopcornIcon} className="h-14" />
                      <span className="text-xl font-bold mt-2">$11</span>
                      <ul className="text-sm mt-2">
                        <li>1x Large Popcorn</li>
                        <li>1x Drinks</li>
                      </ul>
                    </label>
                  </div>
                  <div>
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
                      <img src={NachosIcon} className="h-14" />
                      <span className="text-xl font-bold mt-2">$14</span>
                      <ul className="text-sm mt-2">
                        <li>1x Nachos</li>
                        <li>1x Drinks</li>
                      </ul>
                    </label>
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
                        <img src={FamilyComboIcon} alt="FamilyCombo" className="h-14" />
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
                {/* Total price */}
              </form>
              <div className="mt-4">
                <span className="text-xl font-bold">Total Order Price: </span>
                <span className="text-xl font-bold">${totalOrderPrice}</span>
              </div>
            </div>

            <div>
              <button
                className="mt-6 bg-cyan hover:bg-dark-cyan text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border-2 border-light-gray"
                onClick={() => {
                  if (userId === '') alert('You need to be logged in');
                  else setShowPaymentPart(true);
                }}
              >
                Ready for Payment?
              </button>
            </div>

            {/* hide payment part until user is ready for payment */}
            {showPaymentPart && (
              <Payment totalCost={totalOrderPrice} seats={selectedSeats} foodItem={foodOption} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelectionPage;
