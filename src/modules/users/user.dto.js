import Joi from 'joi';

export const registerSchema = Joi.object({
	name: Joi.string().required(),
	surname: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	role: Joi.string()
		.valid('emprendedor', 'empresa', 'municipalidad', 'admin')
		.default('emprendedor'),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const updateSchema = Joi.object({
	name: Joi.string(),
	surname: Joi.string(),
	email: Joi.string().email(),
	password: Joi.string(),
	role: Joi.string().valid('emprendedor', 'empresa', 'municipalidad', 'admin'),
});
