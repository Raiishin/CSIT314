import express from 'express';
import cors from 'cors';
import UserController from './src//controllers/user.js';

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

app.use('/', router); //to use the routes
