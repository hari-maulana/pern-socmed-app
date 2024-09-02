import jwt from "jsonwebtoken";
import express from "express"
import { Request, Response, NextFunction } from 'express';
import RequestWithUser from "../types/customReqTypes";



  

export const verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let token = req.header("Authorization");
  
      if (!token) {
        return res.status(403).send("Access Denied");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimStart();
      }
  
      const verified = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = verified;
      next();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };