import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createPost, deletePost, getAllPost, getPostById } from '../controllers/postControllers';
import { verifyToken } from '../middlewares/auth';

const app = express();
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', verifyToken, createPost);
router.get('/', getAllPost);
router.get('/:id', getPostById);
router.delete('/:id', deletePost)



export default router
