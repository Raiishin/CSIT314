import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover
} from '@fortawesome/free-brands-svg-icons';

import VisaLogo from '../assets/visa.png';
import MastercardLogo from '../assets/mastercard.png';
import AmexLogo from '../assets/amex.png';
import DiscoverLogo from '../assets/discover.png';

library.add(faCcVisa, faCcMastercard, faCcAmex, faCcDiscover);

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCVV] = useState('');

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
    <div className="flex flex-col items-center mt-8">
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
            <div className="text-lg font-bold">{cardHolder ? cardHolder : 'Cardholder Name'}</div>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardHolder">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiration">
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
  );
};

export default CreditCardForm;
