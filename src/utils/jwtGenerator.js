import jwt from 'jsonwebtoken';
import envs from '../config/envs.js';

export const generateToken = (user) => {
	const payload = { id: user.id, email: user.email, role: user.role };

	return jwt.sign(payload, envs.JWT_SECRET, { expiresIn: '1h' });
};
