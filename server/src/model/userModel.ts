import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().required().max(100),
    email: Joi.string().email().required(),
    username: Joi.string().required().alphanum().min(3).max(30),
    password: Joi.string().min(6).required(),
    bio: Joi.string().max(150).allow(null),
    profilePict: Joi.string().uri().allow(null),
    gallery: Joi.array().items(Joi.string().uri()).allow(null),
});

export default userSchema