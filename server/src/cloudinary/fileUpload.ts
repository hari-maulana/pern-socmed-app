import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define types for Cloudinary storage parameters
interface CloudinaryParams {
  folder?: string;
  allowed_formats?: string[];
  public_id?: (req: express.Request, file: Express.Multer.File) => string;
}

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads", // Folder where the files will be uploaded
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed formats
    public_id: (req, file) => `${Date.now()}_${file.originalname}`, // Custom filename
  } as CloudinaryParams,
});

// Create multer instance with Cloudinary storage
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});
