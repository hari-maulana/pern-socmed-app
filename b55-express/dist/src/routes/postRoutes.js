"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const postControllers_1 = require("../controllers/postControllers");
const auth_1 = require("../middlewares/auth");
const app = (0, express_1.default)();
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/', auth_1.verifyToken, postControllers_1.createPost);
router.get('/', postControllers_1.getAllPost);
router.get('/:id', postControllers_1.getPostById);
router.delete('/:id', postControllers_1.deletePost);
exports.default = router;
