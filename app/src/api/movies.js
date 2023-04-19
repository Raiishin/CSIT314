import config from '../config';

import testMovieData from '../test/moviesData';

const imdbEndpoint = 'https://imdb-api.com/en/API';

export const getMovies = async () => {
  const response = await fetch(`${imdbEndpoint}/InTheaters/${config.imdb.apiKey}`);
  const responseJSON = await response.json();

  return responseJSON.errorMessage !== '' ? testMovieData : responseJSON;
};

export const getMovie = async (id) => {
  const response = await fetch(`https://imdb-api.com/en/API/Title/${config.imdb.apiKey}/${id}`);
  const responseJSON = await response.json();

  return responseJSON.errorMessage !== '' ? testMovieData : responseJSON;
}
