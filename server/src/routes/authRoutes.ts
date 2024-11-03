import express from 'express';
import {register, login} from '../controllers/authControllers';

const app = express();
const router = express.Router();

const registerRoute = app.post('/register', register);
const loginRoute = app.post('/login', login);

export {registerRoute, loginRoute}