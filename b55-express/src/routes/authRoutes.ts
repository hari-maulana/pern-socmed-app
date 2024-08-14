import { PrismaClient } from '@prisma/client';
import express from 'express';
import {register, login} from '../controllers/authControllers';

const prisma = new PrismaClient();
const app = express();

const registerRoute = app.post('/register', register);
const loginRoute = app.post('/login', login);

export {registerRoute, loginRoute}