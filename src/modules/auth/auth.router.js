import { Router } from 'express';
import authController from '../auth/auth.controller.js';
import passport from 'passport';

const authRouter = Router();

authRouter.post('/register', authController.register);

authRouter.get(
	'/profile',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({ message: 'Perfil de usuario', user: req.user });
	}
);

export default authRouter;