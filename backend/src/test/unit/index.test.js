import { saltPassword } from '../../library/index.js';

test('Salt passsword', async () => {
  const password = 'password';
  const saltedPassword = saltPassword(password);

  expect(saltPassword(password)).toEqual(saltedPassword);
});
