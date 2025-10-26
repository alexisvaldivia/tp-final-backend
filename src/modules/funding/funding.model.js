import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import UserModel from '../users/user.model.js';
import ProjectModel from '../projects/project.model.js';

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

FundingModel.belongsTo(UserModel, {
	foreignKey: 'funder_id',
	onDelete: 'CASCADE',
});
UserModel.hasMany(FundingModel, { foreignKey: 'funder_id' });

FundingModel.belongsTo(ProjectModel, {
	foreignKey: 'project_id',
	onDelete: 'CASCADE',
});
ProjectModel.hasMany(FundingModel, { foreignKey: 'project_id' });

export default FundingModel;
