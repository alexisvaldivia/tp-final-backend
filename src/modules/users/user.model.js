import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';

const { INTEGER, STRING, ENUM } = DataTypes;

const UserModel = sequelize.define('User', {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: STRING,
		allowNull: false,
	},
	surname: {
		type: STRING,
		allowNull: false,
	},
	email: {
		type: INTEGER,
		unique: true,
		allowNull: false,
	},
	password: {
		type: INTEGER,
		allowNull: false,
	},
	role: {
		type: ENUM('emprendedor', 'empresa', 'municipalidad', 'admin'),
		defaultValue: 'emprendedor',
		allowNull: false,
	},
});

export default UserModel;