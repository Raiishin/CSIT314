// Movie Controller
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
  getDoc,
  setDoc
} from 'firebase/firestore/lite';
import config from '../config/index.js';
import { formatDate, generateSeatMap, generateBookingId } from '../library/index.js';
import { startOfDay } from 'date-fns';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const movies = collection(db, 'movies');
const movieShowtimes = collection(db, 'movieShowtimes');
const seatLogs = collection(db, 'seatLogs');

const index = async (req, res) => {
  const moviesSnapshot = await getDocs(movies);

  const moviesData = moviesSnapshot.docs.map(doc => doc.data());

  return res.json({ moviesData });
};

const view = async (req, res) => {
  try {
    const { movieId } = req.query;

    const searchQuery = query(movies, where('id', '==', movieId));
    const movieData = await getDocs(searchQuery);

    let returnObject;

    // Error handling if there are no results
    if (movieData.docs.length == 0) {
      return res.json({ message: 'No such movie exists' });
    }

    movieData.forEach(item => {
      returnObject = item.data();
    });

    return res.json(returnObject);
  } catch (err) {
    next(err);
  }
};

const getMovieShowtimes = async (req, res) => {
  const { cinemaName, movieId } = req.query;
  const now = startOfDay(new Date()).getTime() / 1000;

  const searchQuery = query(
    movieShowtimes,
    where('cinemaName', '==', cinemaName),
    where('movieId', '==', movieId),
    where('date', '>=', now) // Does not work now
  );

  const movieShowtimeData = await getDocs(searchQuery);

  // Error handling if there are no results
  if (movieShowtimeData.docs.length == 0) {
    return res.json({ message: 'No upcoming showtimes available' });
  }

  const dateTimingObj = [];

  movieShowtimeData.forEach(item => {
    const movieShowtime = item.data();

    const showtimeDate = new Date(movieShowtime.date * 1000);
    const formattedShowtimeDate = formatDate(showtimeDate);

    dateTimingObj.push({
      date: formattedShowtimeDate,
      showtime: movieShowtime.showtime,
      id: item.id
    });
  });

  // Create an empty object to store unique dates as keys and corresponding timings as values
  const dateTimingsMap = {};

  // Iterate over the objects and populate the dateTimingsMap
  dateTimingObj.forEach(obj => {
    const { date, showtime, id } = obj;

    const timingObject = { showtime, id };
    // Check if the date already exists in the dateTimingsMap
    if (dateTimingsMap[date]) {
      // If the date exists, push the showtime to the corresponding array
      dateTimingsMap[date].push(timingObject);
    } else {
      // If the date doesn't exist, create a new array with the showtime
      dateTimingsMap[date] = [timingObject];
    }
  });

  // Extract the unique dates from the dateTimingsMap and sort them in ascending order
  const dates = Object.keys(dateTimingsMap).sort();

  // Create the timings array corresponding to the dates
  const timings = dates.map(date => {
    const sortedTimings = dateTimingsMap[date].sort(
      (a, b) => parseInt(a.showtime.substring(0, 2)) - parseInt(b.showtime.substring(0, 2))
    );

    return sortedTimings;
  });

  // Return the dates and timings arrays
  return res.json({ dates, timings });
};

const getSeatmap = async (req, res) => {
  const { movieShowtimeId } = req.query;

  // Get movieShowtime information
  const movieShowtimeRef = doc(db, 'movieShowtimes', movieShowtimeId);
  const movieShowtime = await getDoc(movieShowtimeRef);
  const movieShowtimeData = movieShowtime.data();

  const searchQuery = query(seatLogs, where('movieShowtimeId', '==', movieShowtimeId));
  const seatLogsData = await getDocs(searchQuery);

  const seatLogsMappedData = [];

  if (seatLogsData.docs.length !== 0) {
    seatLogsData.forEach(log => seatLogsMappedData.push(log.data()));
  }

  const seatMap = generateSeatMap(seatLogsMappedData);

  const showtimeDate = new Date(movieShowtimeData.date * 1000);
  const formattedShowtimeDate = formatDate(showtimeDate);

  return res.json({ seatMap, date: formattedShowtimeDate, showtime: movieShowtimeData.showtime });
};

const getBooking = async (req, res) => {
  const { bookingId } = req.query;

  const searchQuery = query(seatLogs, where('bookingId', '==', bookingId));
  const seatLogsData = await getDocs(searchQuery);

  // Error handling if there are no results
  if (seatLogsData.docs.length == 0) {
    return res.json({ message: 'No seats were booked with this booking ID' });
  }

  const seatLogsArr = [];
  let movieShowtimeId = '';

  seatLogsData.forEach(seatLog => {
    const data = seatLog.data();

    if (movieShowtimeId === '') movieShowtimeId = data.movieShowtimeId;

    seatLogsArr.push(data.row + data.number);
  });

  // Get movieShowtime information
  const movieShowtimeRef = doc(db, 'movieShowtimes', movieShowtimeId);
  const movieShowtime = await getDoc(movieShowtimeRef);
  const movieShowtimeData = movieShowtime.data();

  const showtimeDate = new Date(movieShowtimeData.date * 1000);
  const formattedShowtimeDate = formatDate(showtimeDate);

  const movieSearchQuery = query(movies, where('id', '==', movieShowtimeData.movieId));
  const movieData = await getDocs(movieSearchQuery);

  let returnObject;
  movieData.forEach(item => {
    returnObject = item.data();
  });

  return res.json({
    movieName: returnObject.title,
    seats: seatLogsArr,
    cinema: movieShowtimeData.cinemaName,
    date: formattedShowtimeDate,
    showtime: movieShowtimeData.showtime
  });
};

const purchaseSeats = async (req, res) => {
  const { movieShowtimeId, seats, foodItem, totalCost, userId } = req.body;

  // Allocate Loyalty Points to user
  const userRef = doc(db, 'users', userId);
  const user = await getDoc(userRef);
  const userData = user.data();

  const loyaltyPointsEarned = totalCost * 10;

  await setDoc(userRef, {
    name: userData.name,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    type: userData.type,
    walletBalance: userData.walletBalance,
    loyaltyPoints: userData.loyaltyPoints + loyaltyPointsEarned
  });

  // <Simulate> Check for payment gateway callback

  // Generate Booking ID
  const bookingId = generateBookingId(new Date());

  seats.map(async seat => {
    const insertObj = {
      row: seat.seatRow,
      number: seat.seatNumber,
      movieShowtimeId,
      bookingId,
      status: 'sold',
      foodItem
    };

    await addDoc(seatLogs, insertObj);
  });

  return res.json({ bookingId });
};

export default {
  index,
  view,
  getMovieShowtimes,
  getSeatmap,
  getBooking,
  purchaseSeats
};
