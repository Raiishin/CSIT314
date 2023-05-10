import MovieCard from '../components/MovieCard';
import React, { useEffect, useState } from 'react';

import { getMovies } from '../api/movies';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const retrieveMovies = async () => {
      if (movies.length === 0) {
        const moviesResponse = await getMovies();
        console.log(moviesResponse);

        // Check if there are any errors
        if (moviesResponse.errorMessage === '') {
          setMovies(moviesResponse.items);
        }
      }
    };

    retrieveMovies();
  }, [getMovies, setMovies]);

  return (
    <div className="text-center">
      <body className="grid grid-cols-6">
        {movies.length > 0 &&
          movies.map(movie => (
            <div className="">
              <button>
                <MovieCard data={movie} />
              </button>
            </div>
          ))}
      </body>
    </div>
  );
};

export default Home;
