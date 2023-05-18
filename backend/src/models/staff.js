import User from './user.js';
import userTypeEnum from '../constants/userTypeEnum.js';

class Staff extends User {
  constructor(id, name, email, phoneNumber) {
    super(id, name, email, phoneNumber, userTypeEnum.STAFF);
  }
}

export default Staff;
