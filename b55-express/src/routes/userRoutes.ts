import { PrismaClient } from '@prisma/client';
import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userControllers';

const prisma = new PrismaClient();

const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUserById)

router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


export default router