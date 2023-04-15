import crypto from 'crypto';
import config from '../config/index.js';

export const saltPassword = password => {
  return crypto
    .pbkdf2Sync(password, config.encryption.salt, config.encryption.iterations, 512, 'sha512')
    .toString('base64');
};
