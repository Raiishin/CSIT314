import {
  saltPassword,
  formatDate,
  validatePhoneNumber,
  generateSeatMap,
  generateBookingId
} from '../../library/index.js';

test('Salt passsword', async () => {
  const password = 'password';
  const saltedPassword = saltPassword(password);

  expect(saltPassword(password)).toEqual(saltedPassword);
});

test('Format date', async () => {
  expect(new Date().getTimezoneOffset()).toBe(0);

  const testDate1 = new Date(new Date(1324567890).toUTCString());
  expect(formatDate(testDate1)).toMatchInlineSnapshot(`"16 Jan"`);

  const testDate2 = new Date(new Date(13245678900).toUTCString());
  expect(formatDate(testDate2)).toMatchInlineSnapshot(`"03 Jun"`);

  const testDate3 = new Date(new Date(23235678900).toUTCString());
  expect(formatDate(testDate3)).toMatchInlineSnapshot(`"26 Sep"`);
});

test('Validate phone number', async () => {
  expect(validatePhoneNumber('12345678')).toMatchInlineSnapshot(`false`);

  expect(validatePhoneNumber('81234567')).toMatchInlineSnapshot(`true`);

  expect(validatePhoneNumber('91234567')).toMatchInlineSnapshot(`true`);

  expect(validatePhoneNumber('01234567')).toMatchInlineSnapshot(`false`);

  expect(validatePhoneNumber('012345678')).toMatchInlineSnapshot(`false`);

  expect(validatePhoneNumber('912345678')).toMatchInlineSnapshot(`false`);
});

test('Generate seat map', async () => {
  const seatLogs = [
    { number: 1, row: 'A', status: 'sold' },
    { number: 6, row: 'A', status: 'unavailable' },
    { number: 7, row: 'A', status: 'sold' },
    { number: 8, row: 'A', status: 'sold' },
    { number: 9, row: 'A', status: 'sold' },
    { number: 10, row: 'A', status: 'sold' },
    { number: 2, row: 'B', status: 'sold' },
    { number: 5, row: 'C', status: 'sold' },
    { number: 3, row: 'D', status: 'sold' }
  ];

  const seatMap = generateSeatMap(seatLogs);

  expect(seatMap).toMatchInlineSnapshot(`
[
  {
    "seatNumber": 1,
    "seatRow": "A",
    "status": "sold",
  },
  {
    "seatNumber": 2,
    "seatRow": "A",
    "status": "available",
  },
  {
    "seatNumber": 3,
    "seatRow": "A",
    "status": "available",
  },
  {
    "seatNumber": 4,
    "seatRow": "A",
    "status": "available",
  },
  {
    "seatNumber": 5,
    "seatRow": "A",
    "status": "available",
  },
  {
    "seatNumber": 6,
    "seatRow": "A",
    "status": "unavailable",
  },
  {
    "seatNumber": 7,
    "seatRow": "A",
    "status": "sold",
  },
  {
    "seatNumber": 8,
    "seatRow": "A",
    "status": "sold",
  },
  {
    "seatNumber": 9,
    "seatRow": "A",
    "status": "sold",
  },
  {
    "seatNumber": 10,
    "seatRow": "A",
    "status": "sold",
  },
  {
    "seatNumber": 1,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 2,
    "seatRow": "B",
    "status": "sold",
  },
  {
    "seatNumber": 3,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 4,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 5,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 6,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 7,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 8,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 9,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 10,
    "seatRow": "B",
    "status": "available",
  },
  {
    "seatNumber": 1,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 2,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 3,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 4,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 5,
    "seatRow": "C",
    "status": "sold",
  },
  {
    "seatNumber": 6,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 7,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 8,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 9,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 10,
    "seatRow": "C",
    "status": "available",
  },
  {
    "seatNumber": 1,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 2,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 3,
    "seatRow": "D",
    "status": "sold",
  },
  {
    "seatNumber": 4,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 5,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 6,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 7,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 8,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 9,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 10,
    "seatRow": "D",
    "status": "available",
  },
  {
    "seatNumber": 1,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 2,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 3,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 4,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 5,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 6,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 7,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 8,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 9,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 10,
    "seatRow": "E",
    "status": "available",
  },
  {
    "seatNumber": 1,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 2,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 3,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 4,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 5,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 6,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 7,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 8,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 9,
    "seatRow": "F",
    "status": "available",
  },
  {
    "seatNumber": 10,
    "seatRow": "F",
    "status": "available",
  },
]
`);
});

test('Generate unique booking ID', async () => {
  const bookingId1 = generateBookingId(new Date());
  const bookingId2 = generateBookingId(new Date());

  // Should be unique, so it shouldn't equal
  expect(bookingId1 === bookingId2).toMatchInlineSnapshot(`false`);
});
