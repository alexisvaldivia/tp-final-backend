import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import UserModel from './userModel.js';
import ProjectModel from './projectModel.js';

const FundingModel = sequelize.define('Funding', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	amount: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
});

// 🔗 Relaciones
Funding.belongsTo(User, { foreignKey: 'funder_id', onDelete: 'CASCADE' });
User.hasMany(Funding, { foreignKey: 'funder_id' });

Funding.belongsTo(Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Project.hasMany(Funding, { foreignKey: 'project_id' });

export default FundingModel;