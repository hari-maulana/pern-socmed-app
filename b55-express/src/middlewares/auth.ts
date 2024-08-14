import jwt from "jsonwebtoken";
import express from "express"

const verifyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let token = req.header("Authorization")
        
    } catch (error) {
        
    }
}