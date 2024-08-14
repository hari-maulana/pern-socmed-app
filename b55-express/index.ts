import { PrismaClient } from '@prisma/client';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import {registerRoute, loginRoute} from './src/routes/authRoutes'
import userRoutes from './src/routes/userRoutes'
import {createPostRoute} from './src/routes/postRoutes'

const prisma = new PrismaClient();
const app = express();
dotenv.config()

// Middleware utk parse JSON
app.use(express.json()); 
app.use(cors());

// auth routes
app.use('/auth', registerRoute)
app.use('/auth', loginRoute)

// user routes
app.use('/users', userRoutes)

// post routes
app.use('/posts', createPostRoute)

///////////////////////
app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany()

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

    res.json({posts, postsWithAuthor})
  } catch (error) {
    res.status(500).json({error: "Failed to load posts"})
  }
})

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params

  try {
    const getPostById = await prisma.post.findUnique({
      where: {id: parseInt(id)}
    }) 
    res.status(200).json({getPostById})
  } catch (error) {
    res.status(500).json({error: "Post is not found"})
  }
})
/////////////////////////////

//TOGGLE LIKE

async function toggleLike(userId: number, postId: number) {
  const existingLike = await prisma.like.findFirst({
    where: {
      userId,
      postId
    }
  });

  if (existingLike) {
    // Unlike the post
    await prisma.like.delete({
      where: {
        id: existingLike.id
      }
    });
  } else {
    // Like the post
    await prisma.like.create({
      data: {
        userId,
        postId
      }
    });
  }
}

//toggleLike(2, 1)

////////////////////////////////
//  TEST COMMENT

app.post('/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { content, userId } = req.body;

  // Input validation
  if (!postId || !content || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Ensure postId is an integer
    const parsedPostId = parseInt(postId, 10);
    if (isNaN(parsedPostId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    // Create comment
    const postComment = await prisma.comment.create({
      data: {
        postId: parsedPostId,
        content,
        userId
      }
    });

    // Respond with the created comment
    res.status(201).json(postComment);
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

///////////////////////////////////
// FOLLOWING AND UNFOLLOWING

app.post('/users/:userId/follow', async (req, res) => {
  const { userId } = req.params;
  const { followingId } = req.body;

  try {
    const follow = await prisma.followRelation.create({
      data: {followerId: parseInt(userId), followingId}
    })
    res.status(200).json(follow)
  } catch (error) {
    res.status(500).json({error: "Failed to follow"})

  }

})


















const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
