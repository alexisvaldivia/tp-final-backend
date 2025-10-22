import { Sequelize } from 'sequelize';
import envs from './envs.js'

const sequelize = new Sequelize(
	envs.DB_NAME,
	envs.DB_USER,
	envs.DB_PASSWORD,
	{
		host: envs.HOST,
		dialect: envs.DB_DIALECT,
	}
);

export default sequelize;