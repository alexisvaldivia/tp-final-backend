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
	JWT_SECRET: Joi.string().required(),
}).unknown();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
	throw new Error(`Error al configurar variables de entorno: ${error.message}`);
}

const envs = {
	DB_NAME: envVars.DB_NAME,
	DB_USER: envVars.DB_USER,
	DB_PASS: envVars.DB_PASS,
	HOST: envVars.HOST,
	DB_DIALECT: envVars.DB_DIALECT,
	SERVER_PORT: envVars.SERVER_PORT,
	JWT_SECRET: envVars.JWT_SECRET,
};

export default envs;