import User from './user.js';
import userTypeEnum from '../constants/userTypeEnum.js';

class Admin extends User {
  constructor(id, name, email, phoneNumber) {
    super(id, name, email, userTypeEnum.ADMIN);
    this.phoneNumber = phoneNumber;
  }

  static get phoneNumber() {
    return this.phoneNumber;
  }
}

export default Admin;
