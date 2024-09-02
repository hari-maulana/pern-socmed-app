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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPostById = exports.getAllPost = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // Assuming you have initialized Prisma
/*CREATE POST BERDASARKAN USER YANG SUDAH LOGIN*/
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { content, picturePath } = req.body;
    try {
        // Temukan user sebenarnya tidak harus
        const user = yield prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // 
        const newPost = yield prisma.post.create({
            data: {
                content,
                picturePath,
                authorId: user.id //id ini berasal dari user yang sudah ditemukan bukan dari req.user
            }
        });
        // 4. Send the created post
        res.status(201).json(newPost);
    }
    catch (error) {
        // 5. Enhanced error handling
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createPost = createPost;
/*GET ALL POST */
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const posts = await prisma.post.findMany()
        //Update dengan menambahkan like
        //Include author
        const postsWithAuthor = yield prisma.post.findMany({
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
        });
        res.json(postsWithAuthor);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to load posts" });
    }
});
exports.getAllPost = getAllPost;
/*Get smua post BY ID*/
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                likes: true,
                comments: true,
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
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the post" });
    }
});
exports.getPostById = getPostById;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.post.delete({
            where: { id: parseInt(id) }
        });
        res.sendStatus(204); // 204 No Content
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.deletePost = deletePost;
