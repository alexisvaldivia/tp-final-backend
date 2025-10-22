import passport from '../../config/passport.js';

const authMiddleware = (req, res, next) => {
	return passport.authenticate(
		'jwt',
		{ session: false },
		(err, user) => {
			if (err || !user) {
				return res.status(401).json({ msg: 'No autorizado' });
			}
			req.user = user;
			next();
		}
	)(req, res, next);
};

export default authMiddleware;