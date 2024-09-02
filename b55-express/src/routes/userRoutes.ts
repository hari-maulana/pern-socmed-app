import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser, getLoggedInUserData, searchUser } from '../controllers/userControllers';
import { verifyToken } from '../middlewares/auth';


const router = express.Router();

router.post('/search', searchUser)
router.get('/me', verifyToken, getLoggedInUserData)
router.get('/', getAllUsers)
router.get('/:id', verifyToken, getUserById)

router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


export default router