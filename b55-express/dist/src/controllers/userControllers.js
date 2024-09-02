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
exports.searchUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.getLoggedInUserData = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
/*UNTUK GET DATA DARI USER YANG LOGIN*/
const getLoggedInUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    console.log(req.user);
    console.log(userId);
    try {
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            include: { following: true, followers: true, posts: true, gallery: true }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
exports.getLoggedInUserData = getLoggedInUserData;
/*UNTUK GET DATA USER SECARA UMUM*/
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: { gallery: true, followers: true, following: true, posts: true }
        });
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const user = yield prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: { following: true, followers: true, posts: true, gallery: true }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
exports.getUserById = getUserById;
// UPDATE (Update an existing user)
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, username, profilePict } = req.body;
    try {
        const user = yield prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, username, profilePict, bio }
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});
exports.updateUser = updateUser;
// DELETE (Delete a user)
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.sendStatus(204); // 204 No Content
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.deleteUser = deleteUser;
// SEARCH USEER
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.body;
    try {
        const users = yield prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive', // Case-insensitive search
                        },
                    },
                    {
                        username: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});
exports.searchUser = searchUser;
