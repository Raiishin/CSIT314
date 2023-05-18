// Movie Controller
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';
import config from '../config/index.js';
import { formatDate } from '../library/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const movies = collection(db, 'movies');
const movieShowtimes = collection(db, 'movieShowtimes');

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
  const now = new Date();

  const searchQuery = query(
    movieShowtimes,
    where('cinemaName', '==', cinemaName),
    where('movieId', '==', movieId)
    // where('date', '>=', now)
  );

  const movieShowtimeData = await getDocs(searchQuery);

  // Error handling if there are no results
  if (movieShowtimeData.docs.length == 0) {
    return res.json({ message: 'No upcoming showtimes available' });
  }

  const dateTimingObj = [];

  movieShowtimeData.forEach(item => {
    const movieShowtime = item.data();

    const showtimeDate = new Date(movieShowtime.date.seconds * 1000);
    const formattedShowtimeDate = formatDate(showtimeDate);

    dateTimingObj.push({ date: formattedShowtimeDate, showtime: movieShowtime.showtime });
  });

  // Create an empty object to store unique dates as keys and corresponding timings as values
  const dateTimingsMap = {};

  // Iterate over the objects and populate the dateTimingsMap
  dateTimingObj.forEach(obj => {
    const { date, showtime } = obj;

    // Check if the date already exists in the dateTimingsMap
    if (dateTimingsMap[date]) {
      // If the date exists, push the showtime to the corresponding array
      dateTimingsMap[date].push(showtime);
    } else {
      // If the date doesn't exist, create a new array with the showtime
      dateTimingsMap[date] = [showtime];
    }
  });

  // Extract the unique dates from the dateTimingsMap and sort them in ascending order
  const dates = Object.keys(dateTimingsMap).sort();

  // Create the timings array corresponding to the dates
  const timings = dates.map(date => {
    const sortedTimings = dateTimingsMap[date].sort(
      (a, b) => parseInt(a.substring(0, 2)) - parseInt(b.substring(0, 2))
    );

    return sortedTimings;
  });

  // Return the dates and timings arrays
  return res.json({ dates, timings });
};

const getSeats = async (req, res) => {
  const { cinemaId, movieId, showtimeId, date } = req.query;

  // cinemaId, movieId, showtimeId, date = used to get movieShowtimes Id

  // movieShowtimesId = Query db for all the seats

  // Fixed size for all halls

  const rows = 6;
  const seats = 10;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < seats; j++) {}
  }
};

export default {
  index,
  view,
  getMovieShowtimes
};
