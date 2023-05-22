import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CinemaPromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      //   const response = await axios.get('/api/promotions'); // Assuming you have an API endpoint that fetches promotions
      const response = await axios.get('promos.json');
      setPromotions(response.data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  const filterPromotionsByCategory = category => {
    if (category === 'current') {
      return promotions;
    } else {
      return promotions.filter(promotion => promotion.category === category);
    }
  };

  const handleTabClick = category => {
    setActiveTab(category);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cinema Promotions</h1>
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded mr-2 ${
            activeTab === 'current' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabClick('current')}>
          Current Promotions
        </button>
        <button
          className={`px-4 py-2 rounded mr-2 ${
            activeTab === 'discounts' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabClick('discounts')}>
          Discounts
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'fandb' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabClick('fandb')}>
          F&B
        </button>
      </div>
      {promotions.length > 0 ? (
        <div className="container mx-auto px-20">
          <div className="grid grid-cols-3 gap-10">
            {filterPromotionsByCategory(activeTab).map(promotion => (
              <div
                key={promotion.id}
                className=" p-2 shadow-md h-full bg-cyan-50 flex items-center">
                <img
                  src={promotion.image}
                  alt={promotion.title}
                  className="w-30 h-44 object-cover mr-6"
                />
                <div>
                  <h2 className="text-xl font-bold mb-2">{promotion.title}</h2>
                  <p>{promotion.description}</p>
                  <p className="text-gray-500 mt-2">
                    Valid from {promotion.startDate} to {promotion.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No promotions available.</p>
      )}
    </div>
  );
};

export default CinemaPromotionsPage;
