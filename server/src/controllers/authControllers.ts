import { PrismaClient } from '@prisma/client';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userSchema from '../model/userModel';

const prisma = new PrismaClient();
const app = express();

//UNTUK REGISTER
const register = async (req: express.Request, res: express.Response) => {

  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details
    });
  }

    try {
      const { name, username, email, password } = value;

      
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
  
      const user = await prisma.user.create({
        data: { name, username, email, password: passwordHash },
      });
  
      res.status(201).json(user);
    }
  
    catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
  
    }
  }

  //UNTUK LOGIN


const login = async (req: express.Request, res: express.Response) => {
    try {
      const { emailOrUsername, password } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: emailOrUsername },
            { username: emailOrUsername }
          ]
        }
      });
  
        if (!user) {
          return res.status(401).json({ error: 'User tidak ditemukan' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Password salah' });
        }
  
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

        //const { password, ...userWithoutPassword } = user;

        return res.status(200).json({user, token});
      //res.status(200).json({user, token});
    }
  
    catch (error) {
      res.status(500).json({ error: '' });
  
    }
  
  }

  export {register, login} 