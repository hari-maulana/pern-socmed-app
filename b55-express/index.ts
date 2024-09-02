import { PrismaClient } from '@prisma/client';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import multer, { diskStorage } from 'multer';


import {registerRoute, loginRoute} from './src/routes/authRoutes'
import userRoutes from './src/routes/userRoutes'
import postRoutes from './src/routes/postRoutes'

const prisma = new PrismaClient();
const app = express();
dotenv.config()

// Middleware utk parse JSON
app.use(express.json()); 
app.use(cors());


/*FILE UPLOAD*/
const storage = multer.diskStorage({
  destination: './src/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({
  storage: storage,
  limits: {fileSize: 10 * 1024 * 1024}
})

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')))

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({
    message: 'File uploaded successfully!',
    filePath: `/uploads/${req.file.filename}`,
  });
});


//app.use ini adalah middleware jadi misalkan setiap request yang masuk ke server, cth 


// auth routes
app.use('/auth', registerRoute)
app.use('/auth', loginRoute)

// user routes
app.use('/users', userRoutes)

// post routes
app.use('/posts', postRoutes)

///////////////////////


/////////////////////////////

//TOGGLE LIKE



app.post('/toggle-like', async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ error: 'userId and postId are required' });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: parseInt(userId),
        postId: parseInt(postId)
      }
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      });
      return res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          userId: parseInt(userId),
          postId: parseInt(postId)
        }
      });
      return res.status(200).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return res.status(500).json({ error: 'An error occurred while toggling like' });
  }
});



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

// app.post('/users/:userId/follow', async (req, res) => { //param is user that want following someone
//   const { userId } = req.params;
//   const { followingId } = req.body; // user that want to be followed

//   try {
//     const follow = await prisma.followRelation.create({
//       data: {followerId: parseInt(userId), followingId}
//     })
//     res.status(200).json(follow)
//   } catch (error) {
//     res.status(500).json({error: "Failed to follow"})

//   }

// })



app.post('/users/:userId/follow', async (req, res) => {
  const { userId } = req.params;
  const { followingId } = req.body;

  try {
    // Check if the follow relation already exists
    const existingFollow = await prisma.followRelation.findFirst({
      where: {
        followerId: parseInt(userId),
        followingId: parseInt(followingId),
      }
    });

    if (existingFollow) {
      // If the relation exists, delete it (unfollow)
      await prisma.followRelation.deleteMany({
        where: {
          followerId: parseInt(userId),
          followingId: parseInt(followingId)
        }
      });
      res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      // If the relation does not exist, create it (follow)
      const follow = await prisma.followRelation.create({
        data: {
          followerId: parseInt(userId),
          followingId: parseInt(followingId)
        }
      });
      res.status(200).json(follow);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to follow/unfollow" });
  }
});



app.get('/users/:userId/follow/:followingId', async (req, res) => {
  const { userId, followingId } = req.params;

  try {
    const follow = await prisma.followRelation.findFirst({
      where: {
        followerId: parseInt(userId),
        followingId: parseInt(followingId),
      },
    });

    if (follow) {
      res.status(200).json(follow);
    } else {
      res.status(204).json({ error: 'Follow relation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the follow relation' });
  }
});










app.get('/', (req, res) => {
  res.send('Backend is working!');
});




const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
