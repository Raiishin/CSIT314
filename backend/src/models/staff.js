import User from './user.js';
import userTypeEnum from '../constants/userTypeEnum.js';

class Staff extends User {
  constructor(id, name, email, phoneNumber) {
    super(id, name, email, userTypeEnum.STAFF);
    this.phoneNumber = phoneNumber;
  }

  static get phoneNumber() {
    return this.phoneNumber;
  }
}

export default Staff;
