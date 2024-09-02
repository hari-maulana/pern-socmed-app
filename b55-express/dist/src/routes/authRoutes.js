"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = exports.registerRoute = void 0;
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const app = (0, express_1.default)();
const router = express_1.default.Router();
const registerRoute = app.post('/register', authControllers_1.register);
exports.registerRoute = registerRoute;
const loginRoute = app.post('/login', authControllers_1.login);
exports.loginRoute = loginRoute;
