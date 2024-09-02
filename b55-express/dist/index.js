"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const authRoutes_1 = require("./src/routes/authRoutes");
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./src/routes/postRoutes"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware utk parse JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/*FILE UPLOAD*/
const storage = multer_1.default.diskStorage({
    destination: './src/uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'src/uploads')));
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
app.use('/auth', authRoutes_1.registerRoute);
app.use('/auth', authRoutes_1.loginRoute);
// user routes
app.use('/users', userRoutes_1.default);
// post routes
app.use('/posts', postRoutes_1.default);
///////////////////////
/////////////////////////////
//TOGGLE LIKE
app.post('/toggle-like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, postId } = req.body;
        if (!userId || !postId) {
            return res.status(400).json({ error: 'userId and postId are required' });
        }
        const existingLike = yield prisma.like.findFirst({
            where: {
                userId: parseInt(userId),
                postId: parseInt(postId)
            }
        });
        if (existingLike) {
            // Unlike the post
            yield prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            });
            return res.status(200).json({ message: 'Post unliked successfully' });
        }
        else {
            // Like the post
            yield prisma.like.create({
                data: {
                    userId: parseInt(userId),
                    postId: parseInt(postId)
                }
            });
            return res.status(200).json({ message: 'Post liked successfully' });
        }
    }
    catch (error) {
        console.error('Error toggling like:', error);
        return res.status(500).json({ error: 'An error occurred while toggling like' });
    }
}));
//toggleLike(2, 1)
////////////////////////////////
//  TEST COMMENT
app.post('/posts/:postId/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const postComment = yield prisma.comment.create({
            data: {
                postId: parsedPostId,
                content,
                userId
            }
        });
        // Respond with the created comment
        res.status(201).json(postComment);
    }
    catch (error) {
        // Log the error for debugging
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
}));
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
app.post('/users/:userId/follow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { followingId } = req.body;
    try {
        // Check if the follow relation already exists
        const existingFollow = yield prisma.followRelation.findFirst({
            where: {
                followerId: parseInt(userId),
                followingId: parseInt(followingId),
            }
        });
        if (existingFollow) {
            // If the relation exists, delete it (unfollow)
            yield prisma.followRelation.deleteMany({
                where: {
                    followerId: parseInt(userId),
                    followingId: parseInt(followingId)
                }
            });
            res.status(200).json({ message: "Unfollowed successfully" });
        }
        else {
            // If the relation does not exist, create it (follow)
            const follow = yield prisma.followRelation.create({
                data: {
                    followerId: parseInt(userId),
                    followingId: parseInt(followingId)
                }
            });
            res.status(200).json(follow);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to follow/unfollow" });
    }
}));
app.get('/users/:userId/follow/:followingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, followingId } = req.params;
    try {
        const follow = yield prisma.followRelation.findFirst({
            where: {
                followerId: parseInt(userId),
                followingId: parseInt(followingId),
            },
        });
        if (follow) {
            res.status(200).json(follow);
        }
        else {
            res.status(204).json({ error: 'Follow relation not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the follow relation' });
    }
}));
app.get('/', (req, res) => {
    res.send('Backend is working!');
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
