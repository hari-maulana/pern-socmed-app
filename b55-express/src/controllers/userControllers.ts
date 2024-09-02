import { PrismaClient } from '@prisma/client';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import RequestWithUser from '../types/customReqTypes';
import { log } from 'console';


const prisma = new PrismaClient();
const app = express();

/*UNTUK GET DATA DARI USER YANG LOGIN*/
const getLoggedInUserData = async (req: RequestWithUser, res: express.Response) => {
  const { userId } = req.user;
  console.log(req.user);
  console.log(userId);
  
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { following: true, followers: true, posts: true, gallery: true}
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' }); 
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

/*UNTUK GET DATA USER SECARA UMUM*/
const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
      const users = await prisma.user.findMany({
        include: { gallery: true, followers: true, following: true, posts: true }
      });
      res.json(users); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };


const getUserById = async (req: RequestWithUser, res: express.Response) => {
    const { id } = req.params;
    console.log(id);
    
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { following: true, followers: true, posts: true, gallery: true}
      });
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' }); 
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };


// UPDATE (Update an existing user)
const updateUser = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { name, bio, username, profilePict } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, username, profilePict, bio }
      });
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  };
  
  // DELETE (Delete a user)
const deleteUser = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: parseInt(id) }
      });
      res.sendStatus(204); // 204 No Content
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

  // SEARCH USEER
  const searchUser = async (req: express.Request, res: express.Response) => {
    const { query } = req.body;

    try {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive', // Case-insensitive search
                        },
                    },
                    {
                        username: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
}

  export {getLoggedInUserData, getAllUsers, getUserById, updateUser, deleteUser, searchUser}