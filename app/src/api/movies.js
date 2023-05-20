const backendEndpoint = 'http://localhost:5001';
// const backendEndpoint = 'https://csit314-project-backend.onrender.com';

export const getMovies = async () => {
  const response = await fetch(`${backendEndpoint}/movies`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getMovie = async id => {
  const response = await fetch(`${backendEndpoint}/movie?movieId=${id}`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getMovieShowtimes = async (movieId, cinemaName) => {
  const response = await fetch(
    `${backendEndpoint}/movieShowtimes?movieId=${movieId}&cinemaName=${cinemaName}`
  );
  const responseJSON = await response.json();

  return responseJSON;
};

export const getSeatmap = async movieShowtimeId => {
  const response = await fetch(`${backendEndpoint}/seatmap?movieShowtimeId=${movieShowtimeId}`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const purchaseSeats = async (movieShowtimeId, seats) => {
  const response = await fetch(`${backendEndpoint}/purchaseSeats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieShowtimeId, seats })
  });

  const responseJSON = await response.json();

  return responseJSON;
};

export const getReview = async id => {
  const response = await fetch(`https://imdb-api.com/en/API/Reviews/${'k_10m052oa'}/${id}`);
  const responseJSON = await response.json();

  return responseJSON;
};
