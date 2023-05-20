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

export const validatePhoneNumber = phoneNumber => {
  const pattern = /^[89]\d{7}$/;
  return pattern.test(phoneNumber);
};

export const generateSeatMap = seatLogs => {
  const seatMap = [];

  for (let row = 1; row <= 6; row++) {
    const rowLetter = String.fromCharCode(64 + row);
    for (let number = 1; number <= 10; number++) {
      const seatLog = seatLogs.find(log => log.number === number && log.row === rowLetter);

      seatMap.push({
        seatRow: rowLetter,
        seatNumber: number,
        status: seatLog ? seatLog.status : 'available'
      });
    }
  }

  return seatMap;
};

export const generateBookingId = date => {
  const timestamp = date.getTime(); // Get current timestamp
  const random = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const bookingID = `${timestamp}-${random}`; // Combine timestamp and random number

  return bookingID;
};
