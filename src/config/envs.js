import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
	DB_NAME: Joi.string().required(),
	DB_USER: Joi.string().required(),
	DB_PASS: Joi.string().allow('').required(),
	HOST: Joi.string().required(),
	DB_DIALECT: Joi.string().required(),
	SERVER_PORT: Joi.number().required(),
}).unknown();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
	throw new Error(`Error al configurar variables de entorno: ${error.message}`);
}

const envs = {
	DB_NAME: envSchema.DB_NAME,
	DB_USER: envSchema.DB_USER,
	DB_PASS: envSchema.DB_PASS,
	HOST: envSchema.HOST,
	DB_DIALECT: envSchema.DB_DIALECT,
	SERVER_PORT: envSchema.SERVER_PORT,
};

export default envs;