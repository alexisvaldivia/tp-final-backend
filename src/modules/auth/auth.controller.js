import sequelize from '../../config/database.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './user.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Faltan incompleto.' });
		}

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: 'El email ya está registrado.' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role: role || 'emprendedor', // por defecto
		});

		const token = jwt.sign(
			{
				id: newUser.id,
				role: newUser.role,
				email: newUser.email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		// Enviar respuesta
		res.status(201).json({
			message: 'Usuario registrado correctamente.',
			user: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
			},
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al registrar el usuario.' });
	}
};

export const authController = {
	singUp,
};
