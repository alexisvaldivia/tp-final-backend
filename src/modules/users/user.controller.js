import UserModel from './user.model.js';

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		if (!req.user) return res.status(401).json({ msg: 'No autorizado' });

		if (String(req.user.id) !== String(id) && req.user.role !== 'admin') {
			return res.status(403).json({ msg: 'No autorizado' });
		}

		const user = await UserModel.findByPk(id, {
			attributes: { exclude: ['password', 'createdAt', 'updatedAT'] },
		});

		if (!user) return res.status(404).json({ msg: 'Usuario no existe' });

		return res.json({ user });
	} catch (error) {
		console.log(error);
		res.status(401).send({ msg: 'Error al obtener la información.' });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;

		if (!req.user) return res.status(401).json({ msg: 'No autorizado' });

		if (String(req.user.id) !== String(id) && req.user.role !== 'admin') {
			return res.status(403).json({ msg: 'No autorizado' });
		}

		const colsToUpdate = ['name', 'surname', 'surname', 'email', 'password'];

		if (req.user.role === 'admin') colsToUpdate.push('role');

		const updates = {};

		for (const col of colsToUpdate) {
			if (Object.prototype.hasOwnProperty.call(req.body, col)) {
				updates[key] = req.body[key];
			}
		}

		if (Object.keys(updates).length === 0) {
			return res
				.status(400)
				.json({ msg: 'No hay campos válidos para actualizar' });
		}

		const user = await UserModel.findByPk(id);
		if (!user) return res.status(404).json({ msg: 'Usuario no existe' });

		await user.update(updates);

		const updated = await UserModel.findByPk(id, {
			attributes: { exclude: ['password'] },
		});

		return res.json({ user: updated });
	} catch (error) {
		return res.json({ error });
	}
};

const userController = { getUserById, updateUser};

export default userController;
