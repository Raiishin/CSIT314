import config from '../config/index.js';
import pbkdf2 from 'crypto-js/pbkdf2';

export const saltPassword = password => {
  return pbkdf2(
    password,
    config.encryption.salt,
    config.encryption.iterations,
    512,
    'sha512'
  ).toString();
};
