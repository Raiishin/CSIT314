import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaChair } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useGlobalStore from '../store/globalStore';

import { getSeatmap, purchaseSeats } from '../api/movies';

import VisaLogo from '../assets/visa.png';
import MastercardLogo from '../assets/mastercard.png';
import AmexLogo from '../assets/amex.png';
import DiscoverLogo from '../assets/discover.png';

import userTypeEnum from '../constants/userTypeEnum';

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCVV] = useState('');

  const accessLevel = useGlobalStore(state => state.accessLevel);

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

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: Handle payment logic based on selected payment method
  };

  return (
    <div>
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
            onChange={e => setSelectedPaymentMethod(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a payment method</option>
            {accessLevel === userTypeEnum.STAFF && <option value="cash">Cash Payment</option>}
            <option value="creditCard">Credit Card</option>
            <option value="bankQrCode">PayLah! / PayNow</option>
          </select>
        </div>
      </div>

      {selectedPaymentMethod === 'creditCard' && (
        <div className="flex flex-col items-center mt-2">
          <div className="bg-gray-100 p-8 rounded w-96 mb-4">
            <h2 className="text-2xl mb-4">Credit Card Preview</h2>
            <div className="bg-white p-4 rounded">
              {cardType && (
                <div className="flex items-center mt-4">
                  <img src={getCardLogo(cardType)} alt={cardType.type} className="w-8 h-8 mr-2" />
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan focus:shadow-outline"
                  id="cardNumber"
                  type="text"
                  placeholder="Enter card number"
                  value={cardNumber}
                  required
                  onChange={e => {
                    const number = e.target.value.replace(/\s/g, '');
                    const formattedCardNumber =
                      cardType === 'amex' ? number.slice(0, 15) : number.slice(0, 16);

                    setCardNumber(formattedCardNumber.replace(/(\d{4})/g, '$1 ').trim());
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardHolder">
                  Card Holder
                </label>
                <input
                  className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan focus:shadow-outline"
                  id="cardHolder"
                  type="text"
                  placeholder="Enter card holder name"
                  value={cardHolder}
                  required
                  onChange={setCardHolder}
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
                    onChange={e => {
                      let formattedExpiration = e.target.value.replace(/[^0-9]/g, '');

                      if (formattedExpiration.length > 6) {
                        formattedExpiration = formattedExpiration.slice(0, 6);
                      }

                      if (formattedExpiration.length >= 3) {
                        formattedExpiration =
                          formattedExpiration.slice(0, 2) + '/' + formattedExpiration.slice(2);
                      }
                      setExpiration(formattedExpiration);
                    }}
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    className="hover:bg-cyan-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan focus:shadow-outline"
                    id="cvv"
                    type="text"
                    placeholder="Enter CVV"
                    value={cvv}
                    required
                    onChange={e => {
                      const cvv = e.target.value.replace(/[^0-9]/g, '');
                      const formattedCVV = cardType === 'amex' ? cvv.slice(0, 4) : cvv.slice(0, 3);

                      setCVV(formattedCVV);
                    }}
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

      {selectedPaymentMethod === 'bankQrCode' && (
        <div className="mt-4 text-center">
          <img
            src="https://i0.wp.com/legendagesingapore.com/wp-content/uploads/2020/09/DBS-icon.png?resize=300%2C119&ssl=1"
            alt="PayLah/PayNow"
          />
        </div>
      )}
    </div>
  );
};

export default Payment;
