// User Controller
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore/lite';
import config from '../config/index.js';
import Customer from '../models/customer.js';
import User from '../models/user.js';
import Staff from '../models/staff.js';
import userTypeEnum from '../constants/userTypeEnum.js';

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
    } else {
      usersData.forEach(item => {
        const data = item.data();

        if (data.type === userTypeEnum.CUSTOMER) {
          const customer = new Customer(
            item.id,
            data.name,
            data.email,
            data.phoneNumber,
            data.walletBalance
          );

          returnObject = customer;
        } else if (data.type === userTypeEnum.STAFF) {
          const staff = new Staff(item.id, data.name, data.email, data.phoneNumber);
          returnObject = staff;
        } else {
          const user = new User(item.id, data.name, data.email);
          returnObject = user;
        }
      });

      return res.json(returnObject);
    }
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, password, email, phoneNumber } = req.body;

    // TODO: Validate phoneNumber

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
      walletBalance: 0
    });

    return res.json({ id: resp.id });
  } catch (err) {
    next(err);
  }
};

export default {
  index,
  view,
  create
};