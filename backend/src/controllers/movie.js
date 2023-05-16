// Movie Controller
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';
import config from '../config/index.js';


// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const db = getFirestore(app);
const movies = collection(db, 'movies');

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
  view
};
