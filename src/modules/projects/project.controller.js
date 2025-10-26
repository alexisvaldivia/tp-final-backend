import ProjectModel from './project.model.js';

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

const projectController = {
	getAll,
	createProject,
};

export default projectController;
