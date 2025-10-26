import bcrypt from 'bcrypt';
import UserModel from '../users/user.model.js';
import { registerSchema, loginSchema } from '../users/user.dto.js';
import { generateToken } from '../../utils/jwtGenerator.js';

const register = async (req, res) => {
	try {
		const { error } = registerSchema.validate(req.body);

		if (error) res.status(401).json({ msg: 'Error al registrarse.' });

		const { name, surname, email, password, role } = req.body;

		const userExists = await UserModel.findOne({ where: { email } });

		if (userExists) return res.status(400).json({ message: 'El correo ya está registrado.' });

		const newUser = await UserModel.create({
			name,
			surname,
			email,
			password,
			role,
		});

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

const login = async (req, res) => {
	try {
		const { error } = loginSchema.validate();

		if (error) res.status(401).json({ msg: 'Error al Iniciar Sesión' });

		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Email y contraseña requeridos.' });
		}

		const user = await UserModel.findOne({ where: { email } });
		if (!user) {
			return res
				.status(401)
				.json({ message: 'Email no asociado a una cuenta.' });
		}

		const comparePassword = await bcrypt.compare(password, user.password);
		if (!comparePassword) {
			return res.status(401).json({ message: 'Contraseña incorrecta.' });
		}

		const token = generateToken(user);

		return res.json({
			message: 'Login exitoso',
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			token,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Error al iniciar sesión' });
	}
};

const authController = {
	register,
	login,
};

export default authController;
