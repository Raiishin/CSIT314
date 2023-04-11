import config from '../config';

import testMovieData from '../test/moviesData';

export const getMovies = async () => {
  const response = await fetch(`https://imdb-api.com/en/API/InTheaters/${config.imdb.apiKey}`);
  const responseJSON = await response.json();

  return responseJSON.errorMessage !== '' ? testMovieData : responseJSON;
};
