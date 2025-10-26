import ProjectModel from './project.model.js';
import UserModel from '../users/user.model.js';

const createProject = async (req, res) => {
	try {
		const user = req.user;

		if (!user) res.status(401).json({ msg: 'Sin usuario' });

		const result = await user.createProject(req.body);

		if (result) res.status(201).json({ resultado: result });
	} catch (err) {
		console.error(err);
		res.status(400).json({ msg: 'Error al crear el proyecto.' });
	}
};

const getAll = async (req, res) => {
	const projects = await ProjectModel.findAll({});

	res.status(201).json({ projects });
};

const getAllUserProjects = async (req, res) => {
	try {
		const { idUser } = req.params;
		if (!idUser) return res.status(400).json({ msg: 'No se encontró el id' });

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

const projectController = {
	getAll,
	createProject,
	getAllUserProjects,
};

export default projectController;
