import { saltPassword, formatDate } from '../../library/index.js';

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
