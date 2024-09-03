// src/custom.d.ts or src/types/multer-storage-cloudinary.d.ts
import 'multer-storage-cloudinary';

declare module 'multer-storage-cloudinary' {
  interface Params {
    folder?: string; // Optional parameter for folder
    allowed_formats?: string[]; // Optional parameter for allowed formats
    public_id?: (req: any, file: any) => string; // Optional parameter for public_id
  }
}
