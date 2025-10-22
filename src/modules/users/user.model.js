import sequelize from '../../config/database.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

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
		type: STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: STRING,
		allowNull: false,
	},
	role: {
		type: ENUM('emprendedor', 'empresa', 'municipalidad', 'admin'),
		defaultValue: 'emprendedor',
		allowNull: false,
	},
});

// Antes de crear el registro en la db, se hashea la contraseña
UserModel.beforeCreate(async (user) => {


	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
});

export default UserModel;
