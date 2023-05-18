// User Controller
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore/lite';
import config from '../config/index.js';
import Customer from '../models/customer.js';
import User from '../models/user.js';
import Staff from '../models/staff.js';
import Admin from '../models/admin.js';
import Management from '../models/management.js';
import userTypeEnum from '../constants/userTypeEnum.js';
import { validatePhoneNumber } from '../library/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const users = collection(db, 'users');

const index = async (req, res) => {
  const usersSnapshot = await getDocs(users);
  const usersData = usersSnapshot.docs.map(doc => doc.data());

  return res.json({ usersData });
};

const view = async (req, res, next) => {
  try {
    const { password, email } = req.query;

    const searchQuery = query(
      users,
      where('password', '==', password),
      where('email', '==', email)
    );
    const usersData = await getDocs(searchQuery);

    let returnObject;

    // Error handling if there are no results
    if (usersData.docs.length == 0) {
      return res.json({ message: 'Incorrect password or no such user exists' });
    }

    usersData.forEach(item => {
      const data = item.data();

      if (data.type === userTypeEnum.CUSTOMER) {
        const customer = new Customer(
          item.id,
          data.name,
          data.email,
          data.phoneNumber,
          data.walletBalance,
          data.loyaltyPoints
        );

        returnObject = customer;
      } else if (data.type === userTypeEnum.STAFF) {
        const staff = new Staff(item.id, data.name, data.email, data.phoneNumber);
        returnObject = staff;
      } else if (data.type === userTypeEnum.MANAGEMENT) {
        const management = new Management(item.id, data.name, data.email, data.phoneNumber);
        returnObject = management;
      } else if (data.type === userTypeEnum.ADMIN) {
        const admin = new Admin(item.id, data.name, data.email, data.phoneNumber);
        returnObject = admin;
      } else {
        const user = new User(item.id, data.name, data.email, data.phoneNumber);
        returnObject = user;
      }
    });

    return res.json(returnObject);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, password, email, phoneNumber } = req.body;

    if (!validatePhoneNumber(phoneNumber))
      return res.json({ message: 'This phone number is invalid' });

    // Validate if user already exists using email
    const searchQuery = query(users, where('email', '==', email));
    const usersData = await getDocs(searchQuery);

    // Error handling if email already exists
    if (usersData.docs.length !== 0) return res.json({ message: 'This email already exists' });

    // Create new user, default to being a customer
    const resp = await addDoc(users, {
      name,
      password,
      email,
      phoneNumber,
      type: userTypeEnum.CUSTOMER,
      walletBalance: 0,
      loyaltyPoints: 0
    });

    const userRef = doc(db, 'users', resp.id);
    const user = await getDoc(userRef);

    const data = user.data();

    const customer = new Customer(
      resp.id,
      data.name,
      data.email,
      data.phoneNumber,
      data.walletBalance,
      data.loyaltyPoints
    );

    return res.json(customer);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const { id, phoneNumber, password } = req.body;

  if (!validatePhoneNumber(phoneNumber))
    return res.json({ message: 'This phone number is invalid' });

  // Get current user information
  const userRef = doc(db, 'users', id);
  const user = await getDoc(userRef);

  // Update user information
  const updatedUser = { ...user.data() };
  updatedUser.phoneNumber = phoneNumber;

  if (password !== '') {
    updatedUser.password = password;
  }

  // Update in firebase
  await setDoc(userRef, updatedUser);

  // Retrieve the updated user
  const userAfterUpdate = await getDoc(userRef);

  return res.json(userAfterUpdate.data());
};

export default {
  index,
  view,
  create,
  update
};
