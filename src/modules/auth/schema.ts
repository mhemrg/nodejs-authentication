import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
