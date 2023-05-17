// Management Controller
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore/lite';
import config from '../config/index.js';

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);

// TODO :: ACL for APIs
// Only management can access these apis

const getCinemas = async (req, res) => {
  const cinemas = collection(db, 'cinemas');
  const cinemasSnapshot = await getDocs(cinemas);

  const cinemasData = cinemasSnapshot.docs.map(doc => doc.data());

  return res.json({ cinemasData });
};

const getCinemaHalls = async (req, res) => {
  const cinemaHalls = collection(db, 'cinemaHall');
  const cinemaHallsSnapshot = await getDocs(cinemaHalls);

  const cinemaHallsData = cinemaHallsSnapshot.docs.map(doc => doc.data());

  return res.json({ cinemaHallsData });
};

const getTimeslots = async (req, res) => {
  const timeslots = collection(db, 'timeslots');
  const timeslotsSnapshot = await getDocs(timeslots);

  const timeslotsData = timeslotsSnapshot.docs.map(doc => doc.data());

  return res.json({ timeslotsData });
};

const createMovieShowtime = async (req, res, next) => {
  try {
    const { cinemaName, hallId, movieId, showtime, date } = req.body;

    const formattedDate = new Date(date);
    const movieShowtimes = collection(db, 'movieShowtimes');

    // Validate if this showtime is already taken
    const searchQuery = query(
      movieShowtimes,
      where('cinemaName', '==', cinemaName),
      where('hallId', '==', hallId),
      where('showtime', '==', showtime),
      where('date', '==', formattedDate)
    );

    const movieShowtimesData = await getDocs(searchQuery);

    // Error handling if movie showtime already taken
    if (movieShowtimesData.docs.length !== 0)
      return res.json({ message: 'This showtime is already taken' });

    // Create new user, default to being a customer
    const resp = await addDoc(movieShowtimes, {
      cinemaName,
      hallId,
      movieId,
      showtime,
      date: formattedDate
    });

    return res.json({ id: resp.id });
  } catch (err) {
    next(err);
  }
};

export default {
  getCinemas,
  getCinemaHalls,
  getTimeslots,
  createMovieShowtime
};
