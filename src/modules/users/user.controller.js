import UserModel from './user.model.js';

export const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const authUser = req.user;

		// requiere estar logueado
		// if (!authUser) return res.status(401).json({ msg: 'No autorizado' });

		// permitir solo al dueño del perfil o admin
		// if (String(authUser.id) !== String(id) && authUser.role !== 'admin') {
		//     return res.status(403).json({ msg: 'Acceso denegado' });
		// }

		const user = await UserModel.findByPk(id, {
			attributes: { exclude: ['password', 'createdAt', 'updatedAT'] },
		});

		if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

		return res.json({ user });
	} catch (error) {
		// next(error);
		console.log(error);
		res.status(401).send({ msg: 'Error al obtener la información.' });
	}
};

const userController = { getUserById };

export default userController;
