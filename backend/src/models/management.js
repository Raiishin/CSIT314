import User from './user.js';
import userTypeEnum from '../constants/userTypeEnum.js';

class Management extends User {
  constructor(id, name, email, phoneNumber) {
    super(id, name, email, phoneNumber, userTypeEnum.MANAGEMENT);
  }
}

export default Management;
