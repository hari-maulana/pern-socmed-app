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
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
//UNTUK REGISTER
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = userModel_1.default.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details
        });
    }
    try {
        const { name, username, email, password } = value;
        const salt = yield bcrypt_1.default.genSalt();
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const user = yield prisma.user.create({
            data: { name, username, email, password: passwordHash },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});
exports.register = register;
//UNTUK LOGIN
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailOrUsername, password } = req.body;
        const user = yield prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });
        if (!user) {
            return res.status(401).json({ error: 'User tidak ditemukan' });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password salah' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
        //const { password, ...userWithoutPassword } = user;
        return res.status(200).json({ user, token });
        //res.status(200).json({user, token});
    }
    catch (error) {
        res.status(500).json({ error: '' });
    }
});
exports.login = login;
