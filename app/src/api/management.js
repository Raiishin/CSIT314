const backendEndpoint = 'https://csit314-project-backend.onrender.com';

// TODO :: ACL for APIs
// Only management can access these apis

export const getCinemas = async () => {
  const response = await fetch(`${backendEndpoint}/management/cinemas`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getCinemaHalls = async () => {
  const response = await fetch(`${backendEndpoint}/management/cinemaHalls`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getTimeslots = async () => {
  const response = await fetch(`${backendEndpoint}/management/timeslots`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const getMovies = async () => {
  const response = await fetch(`${backendEndpoint}/management/movies`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const saveShowtimes = async (cinemaId, hallId, movieId, showtimeId, date) => {
  const response = await fetch(`${backendEndpoint}/management/saveShowtimes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cinemaId, hallId, movieId, showtimeId, date })
  });
  const responseJSON = await response.json();

  return responseJSON;
};
