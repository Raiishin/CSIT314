import User from './user.js';
import userTypeEnum from '../constants/userTypeEnum.js';

class Management extends User {
  constructor(id, name, email, phoneNumber) {
    super(id, name, email, userTypeEnum.MANAGEMENT);
    this.phoneNumber = phoneNumber;
  }

  static get phoneNumber() {
    return this.phoneNumber;
  }
}

export default Management;
