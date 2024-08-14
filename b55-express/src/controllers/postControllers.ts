import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Assuming you have initialized Prisma

const createPost = async (req: express.Request, res: express.Response) => {
    const { authorId, content, picturePath } = req.body;

    try {
        // 1. Find the user
        const user = await prisma.user.findUnique({
            where: { id: authorId }
        });

        // 2. Handle user not found
        if (!user) {
            return res.status(404).json({ error: 'User not found' }); 
        }

        // 3. Create the post (associating with the user)
        const newPost = await prisma.post.create({
            data: {
                content,
                picturePath,
                authorId: user.id
            }
        });

        // 4. Send the created post
        res.status(201).json(newPost);

    } catch (error) {
        // 5. Enhanced error handling
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
};

export { createPost };
