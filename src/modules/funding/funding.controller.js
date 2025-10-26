import Joi from 'joi';
import FundingModel from './funding.model.js';
import ProjectModel from '../projects/project.model.js';

const createFundingSchema = Joi.object({
	amount: Joi.number().precision(2).positive().required(),
	projectId: Joi.number().integer().positive().required(),
});

const createFunding = async (req, res) => {
	try {
		const user = req.user;
		if (!user) return res.status(401).json({ msg: 'No autorizado' });

		const { error, value } = createFundingSchema.validate(req.body, {
			abortEarly: false,
			stripUnknown: true,
		});
		if (error)
			return res
				.status(400)
				.json({
					msg: 'Datos inválidos',
				});

		const { amount, projectId } = value;

		const project = await ProjectModel.findByPk(projectId);
		if (!project)
			return res.status(404).json({ msg: 'Proyecto no encontrado' });

		// Crear funding
		const funding = await FundingModel.create({
			amount,
			funder_id: user.id,
			project_id: project.id,
		});

		const currentRaised = parseFloat(project.raised_amount || 0);
		const newRaised = parseFloat(
			(currentRaised + parseFloat(amount)).toFixed(2)
		);

		await project.update({ raised_amount: newRaised });

		const goal = parseFloat(project.goal_amount || 0);
		if (newRaised >= goal && project.status !== 'financiado') {
			await project.update({ status: 'financiado' });
		}

		await project.reload();

		return res.status(201).json({ funding, project });
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ msg: 'Error al crear funding', error: err.message });
	}
};

const getFundingsByProject = async (req, res) => {
	try {
		const { projectId } = req.params;
		if (!projectId)
			return res.status(400).json({ msg: 'No se encontró el id' });

		const project = await ProjectModel.findByPk(projectId);
		if (!project)
			return res.status(404).json({ msg: 'Proyecto no encontrado' });

		const fundings = await FundingModel.findAll({
			where: { project_id: project.id },
			order: [['id', 'DESC']],
		});

		return res.json({ fundings });
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ msg: 'Error al obtener fundings', error: err.message });
	}
};

const fundingController = {
	createFunding,
	getFundingsByProject,
};

export default fundingController;
