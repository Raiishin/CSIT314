import User from './user.js';
import userTypeEnum from '../constants/userTypeEnum.js';

class Customer extends User {
  constructor(id, name, email, phoneNumber, walletBalance, loyaltyPoints) {
    super(id, name, email, userTypeEnum.CUSTOMER);
    this.phoneNumber = phoneNumber;
    this.walletBalance = walletBalance ?? 0;
    this.loyaltyPoints = loyaltyPoints ?? 0;
  }

  static get phoneNumber() {
    return this.phoneNumber;
  }

  static get walletBalance() {
    return this.walletBalance;
  }

  static get loyaltyPoints() {
    return this.loyaltyPoints;
  }

  doesCustomerHaveSufficientBalance(requiredAmount) {
    return this.walletBalance >= requiredAmount;
  }
}

export default Customer;
