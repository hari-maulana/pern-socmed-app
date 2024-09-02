"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/search', userControllers_1.searchUser);
router.get('/me', auth_1.verifyToken, userControllers_1.getLoggedInUserData);
router.get('/', userControllers_1.getAllUsers);
router.get('/:id', auth_1.verifyToken, userControllers_1.getUserById);
router.put('/:id', userControllers_1.updateUser);
router.delete('/:id', userControllers_1.deleteUser);
exports.default = router;
