import express from 'express';
import { PrismaClient } from '@prisma/client';
import RequestWithUser from '../types/customReqTypes';
const prisma = new PrismaClient(); // Assuming you have initialized Prisma


/*CREATE POST BERDASARKAN USER YANG SUDAH LOGIN*/
const createPost = async (req: RequestWithUser, res: express.Response) => {
    const { userId } = req.user;
    const { content, picturePath } = req.body;

    try {
        // Temukan user sebenarnya tidak harus
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        
        if (!user) {
            return res.status(404).json({ error: 'User not found' }); 
        }

        // 
        const newPost = await prisma.post.create({
            data: {
                content,
                picturePath,
                authorId: user.id //id ini berasal dari user yang sudah ditemukan bukan dari req.user
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

/*GET ALL POST */
const getAllPost = async (req: express.Request, res: express.Response ) => {
    try {
      //const posts = await prisma.post.findMany()
  
      //Update dengan menambahkan like
      //Include author
      const postsWithAuthor = await prisma.post.findMany(
        {
          include: {
            likes: true,
            comments: true,
            author: {
              select: {
                profilePict: true,
                name: true,
                username: true,
              }
            }
          }
        }
      )
  
      res.json(postsWithAuthor)
    } catch (error) {
      res.status(500).json({error: "Failed to load posts"})
    }
  }

  /*Get smua post BY ID*/

  const getPostById = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
  
    try {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: {
          likes: true,
          comments: {
            include: {
              user: {
                select: {
                  profilePict: true,
                  name: true,
                  username: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },

          author: {
            select: {
              profilePict: true,
              name: true,
              username: true,
            },
          },
        },
      });
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching the post" });
    }
  };

  const deletePost = async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        try {
          await prisma.post.delete({
            where: { id: parseInt(id) }
          });
          res.sendStatus(204); // 204 No Content
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to delete user' });
        }
      };
  

export { createPost, getAllPost, getPostById, deletePost };
