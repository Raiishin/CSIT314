import express from 'express';
import cors from 'cors';
import UserController from './src/controllers/user.js';
import ManagementController from './src/controllers/management.js';
import MovieController from './src/controllers/movie.js';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());

app.listen(port, function () {
  console.log('Application Started at: ' + port);
});

const router = express.Router();

router.get('/users', UserController.index);
router.get('/user', UserController.view);
router.post('/createUser', UserController.create);
router.post('/updateUser', UserController.update);

router.get('/movies', MovieController.index);
router.get('/movie', MovieController.view);
router.get('/movieShowtimes', MovieController.getMovieShowtimes);

router.get('/management/cinemas', ManagementController.getCinemas);
router.get('/management/cinemaHalls', ManagementController.getCinemaHalls);
router.get('/management/timeslots', ManagementController.getTimeslots);

router.post('/management/saveShowtimes', ManagementController.createMovieShowtime);

app.use('/', router); //to use the routes
