const backendEndpoint = 'https://csit314-project-backend.onrender.com';

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
