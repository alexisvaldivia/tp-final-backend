import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import UserModel from '../users/user.model.js';

const ProjectModel = sequelize.define('Project', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	goal_amount: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	raised_amount: {
		type: DataTypes.DECIMAL(10, 2),
		defaultValue: 0,
	},
	status: {
		type: DataTypes.ENUM('pendiente', 'financiado', 'rechazado'),
		defaultValue: 'pendiente',
	},
});

Project.belongsTo(UserModel, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(ProjectModel, { foreignKey: 'user_id' });

export default ProjectModel;