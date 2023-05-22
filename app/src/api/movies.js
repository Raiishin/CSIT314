import config from '../config/index';

export const getMovies = async () => {
  const response = await fetch(`${config.backendEndpoint}/movies`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getMovie = async id => {
  const response = await fetch(`${config.backendEndpoint}/movie?movieId=${id}`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getMovieShowtimes = async (movieId, cinemaName) => {
  const response = await fetch(
    `${config.backendEndpoint}/movieShowtimes?movieId=${movieId}&cinemaName=${cinemaName}`
  );
  const responseJSON = await response.json();

  return responseJSON;
};

export const getSeatmap = async movieShowtimeId => {
  const response = await fetch(
    `${config.backendEndpoint}/seatmap?movieShowtimeId=${movieShowtimeId}`
  );
  const responseJSON = await response.json();

  return responseJSON;
};

export const checkBooking = async bookingId => {
  const response = await fetch(`${config.backendEndpoint}/checkBooking?bookingId=${bookingId}`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const purchaseSeats = async (movieShowtimeId, seats, foodItem, totalCost, userId) => {
  const response = await fetch(`${config.backendEndpoint}/purchaseSeats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieShowtimeId, seats, foodItem, totalCost, userId })
  });

  const responseJSON = await response.json();

  return responseJSON;
};

export const getReview = async id => {
  const response = await fetch(`https://imdb-api.com/en/API/Reviews/${'k_10m052oa'}/${id}`);
  const responseJSON = await response.json();

  return responseJSON;
};
