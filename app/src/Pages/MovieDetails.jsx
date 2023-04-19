import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import { getMovie } from '../api/index.js';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const params = useParams();

  useEffect(() => {
    const retrieveMovie = async () => {
      const data = await getMovie(params.id);
      setMovie(data);
    };
    if (typeof params !== 'undefined') {
      retrieveMovie();
    }
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen py-12 md:py-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/3 lg:w-2/5 mb-8 md:mb-0">
          <img
            src={movie.image}
            width={250}
            height={250}
            className="rounded-lg shadow-lg"
            alt="Movie poster"
          />
        </div>
        <div className="md:w-2/3 lg:w-3/5 md:pl-8">
          <h1 className="text-white text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="text-gray-400 leading-relaxed mb-8">
            <div className="flex flex-wrap mb-4">
              <h2 className="text-lg font-medium mr-2">Genres:</h2>
              <ul>
                <li className="inline-block bg-gray-700 rounded-full py-1 px-3 text-sm font-medium text-gray-400 mr-2 mb-2">
                  {movie.genres}
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap mb-4">
              <h2 className="text-lg font-medium mr-2">Cast:</h2>
              <ul>
                <li className="inline-block text-gray-400 mr-2 mb-2">{movie.stars}</li>
              </ul>
            </div>
            <div className="flex flex-wrap mb-4">
              <h2 className="text-lg font-medium mr-2">Director:</h2>
              <p className="text-gray-400">{movie.directors}</p>
            </div>
            <h2 className="text-lg font-medium mt-8 mb-2">Sypnosis</h2>
            <p>{movie.plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
