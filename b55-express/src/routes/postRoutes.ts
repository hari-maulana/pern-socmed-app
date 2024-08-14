import { PrismaClient } from '@prisma/client';
import express from 'express';
import { createPost } from '../controllers/postControllers';
const prisma = new PrismaClient();
const app = express();

const createPostRoute = app.post('/', createPost);

export {createPostRoute}
