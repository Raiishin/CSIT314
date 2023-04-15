import { saltPassword } from '../library/index.js';

const backendEndpoint = 'https://csit314-project-backend.onrender.com';

export const userLogin = async (email, password) => {
  const saltedPassword = saltPassword(password);

  const response = await fetch(`${backendEndpoint}/user?email=${email}&password=${saltedPassword}`);
  const responseJSON = await response.json();

  return responseJSON;
};

export const createUser = async (name, email, password, phoneNumber) => {
  const saltedPassword = saltPassword(password);

  const response = await fetch(`${backendEndpoint}/createUser`, {
    method: 'POST',
    body: { name, email, password: saltedPassword, phoneNumber }
  });
  const responseJSON = await response.json();

  return responseJSON;
};