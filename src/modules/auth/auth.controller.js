import bcrypt from 'bcrypt';
import UserModel from '../users/user.model.js';
import { generateToken } from '../../utils/jwtGenerator.js';

const register = async (req, res) => {
	try {
		const { name, surname, email, password, role } = req.body;

		// Verificar si el usuario ya existe
		const userExists = await UserModel.findOne({ where: { email } });
		if (userExists)
			return res.status(400).json({ message: 'El correo ya está registrado.' });

		// Crear el usuario (el hash se hace en el hook beforeCreate)
		const newUser = await UserModel.create({
			name,
			surname,
			email,
			password,
			role,
		});

		// Generar token
		const token = generateToken(newUser);

		res.status(201).json({
			message: 'Usuario registrado',
			user: {
				id: newUser.id,
				name: newUser.name,
				surname: newUser.surname,
				email: newUser.email,
				role: newUser.role,
			},
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al registrar el usuario' });
	}
};

const authController = {
	register,
};

export default authController;