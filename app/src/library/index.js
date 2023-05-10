import config from '../config/index.js';

export const saltPassword = password => {
  return password;
  // return bcrypt.hashSync(password, config.encryption.salt);
};
