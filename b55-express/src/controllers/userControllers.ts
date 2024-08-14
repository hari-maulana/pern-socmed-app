import { PrismaClient } from '@prisma/client';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const app = express();

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


const getUserById = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
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
    const { name, email } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email }
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

  export {getAllUsers, getUserById, updateUser, deleteUser}