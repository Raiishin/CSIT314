import User from './user.js';
import userTypeEnum from '../constants/userTypeEnum.js';

class Admin extends User {
  constructor(id, name, email, phoneNumber) {
    super(id, name, email, phoneNumber, userTypeEnum.ADMIN);
  }
}

export default Admin;
