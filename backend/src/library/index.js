import crypto from 'crypto';
import config from '../config/index.js';

export const saltPassword = password => {
  return crypto
    .pbkdf2Sync(password, config.encryption.salt, config.encryption.iterations, 512, 'sha512')
    .toString('base64');
};

export const formatDate = date => {
  const day = date.getDate();
  const month = date.getMonth();

  const monthAbbreviations = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const formattedDate = `${day.toString().padStart(2, '0')} ${monthAbbreviations[month]}`;

  return formattedDate;
};
