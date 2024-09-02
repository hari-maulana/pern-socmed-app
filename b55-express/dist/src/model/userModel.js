"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string().required().max(100),
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().required().alphanum().min(3).max(30),
    password: joi_1.default.string().min(6).required(),
    bio: joi_1.default.string().max(150).allow(null),
    profilePict: joi_1.default.string().uri().allow(null),
    gallery: joi_1.default.array().items(joi_1.default.string().uri()).allow(null),
});
exports.default = userSchema;
