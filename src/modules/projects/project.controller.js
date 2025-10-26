import ProjectModel from './project.model.js';
import UserModel from '../users/user.model.js';
import {
	createProjectSchema,
	updateProjectSchema,
	idParamSchema,
} from './project.dto.js';

const createProject = async (req, res) => {
	try {
		const user = req.user;
		if (!user) return res.status(401).json({ msg: 'Sin usuario' });

		const { error, value } = createProjectSchema.validate(req.body, {
			abortEarly: false,
			stripUnknown: true,
		});
		if (error)
			return res.status(400).json({
				msg: 'Datos inválidos',
				details: error.details.map((d) => d.message),
			});

		const result = await user.createProject(value);

		if (result) return res.status(201).json({ resultado: result });

		return res.status(500).json({ msg: 'No se pudo crear el proyecto' });
	} catch (err) {
		console.error(err);
		return res.status(400).json({ msg: 'Error al crear el proyecto.' });
	}
};

const getAll = async (req, res) => {
	const projects = await ProjectModel.findAll({});
	return res.status(200).json({ projects });
};

const getAllUserProjects = async (req, res) => {
	try {
		const { idUser } = req.params;
		if (!idUser) return res.status(400).json({ msg: 'No se encontró el id' });

		const { error: idError } = idParamSchema.validate({ id: Number(idUser) });
		if (idError)
			return res
				.status(400)
				.json({
					msg: 'Id inválido',
				});

		const user = await UserModel.findByPk(idUser);

		if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

		const projects = await user.getProjects({
			attributes: { exclude: ['createdAt', 'updatedAt'] },
		});

		return res.json({ projects });
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ msg: 'Error al obtener proyectos', error: err.message });
	}
};

const updateProject = async (req, res) => {
	try {
		const { id } = req.params;

		const { error: idError } = idParamSchema.validate({ id: Number(id) });
		if (idError)
			return res
				.status(400)
				.json({
					msg: 'Id inválido',
				});

		const { error, value } = updateProjectSchema.validate(req.body, {
			abortEarly: false,
			stripUnknown: true,
		});
		if (error)
			return res.status(400).json({
				msg: 'Datos inválidos',
			});

		if (Object.keys(value).length === 0)
			return res
				.status(400)
				.json({ msg: 'No se proporcionaron campos para actualizar' });

		const project = await ProjectModel.findByPk(id);
		if (!project)
			return res.status(404).json({ msg: 'Proyecto no encontrado' });


		const user = req.user;
		if (user && project.userId && project.userId !== user.id)
			return res
				.status(403)
				.json({ msg: 'No autorizado para actualizar este proyecto' });

		await project.update(value);
		await project.reload();

		return res.status(200).json({ project });
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.json({ msg: 'Error al actualizar proyecto', error: err.message });
	}
};

const projectController = {
	getAll,
	createProject,
	getAllUserProjects,
	updateProject,
};

export default projectController;
