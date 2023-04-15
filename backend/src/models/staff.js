import User from './user.js';

class Staff extends User {
  constructor(id, name, email, phoneNumber) {
    super(id, name, email);
    this.phoneNumber = phoneNumber;
  }

  static get phoneNumber() {
    return this.phoneNumber;
  }
}

export default Staff;
