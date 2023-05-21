import config from '../config/index';

export const getCinemas = async () => {
  const response = await fetch(`${config.backendEndpoint}/management/cinemas`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getCinemaHalls = async () => {
  const response = await fetch(`${config.backendEndpoint}/management/cinemaHalls`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getTimeslots = async () => {
  const response = await fetch(`${config.backendEndpoint}/management/timeslots`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getMovies = async () => {
  const response = await fetch(`${config.backendEndpoint}/management/movies`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const saveShowtimes = async (cinemaName, hallId, movieId, showtime, date) => {
  const response = await fetch(`${config.backendEndpoint}/management/saveShowtimes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cinemaName, hallId, movieId, showtime, date })
  });
  const responseJSON = await response.json();

  return responseJSON;
};
