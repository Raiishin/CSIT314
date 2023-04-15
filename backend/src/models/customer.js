import User from './user.js';

class Customer extends User {
  constructor(id, name, email, phoneNumber, walletBalance) {
    super(id, name, email);
    this.phoneNumber = phoneNumber;
    this.walletBalance = walletBalance ?? 0;
  }

  static get phoneNumber() {
    return this.phoneNumber;
  }

  static get walletBalance() {
    return this.walletBalance;
  }

  doesCustomerHaveSufficientBalance(requiredAmount) {
    return this.walletBalance >= requiredAmount;
  }
}

export default Customer;
