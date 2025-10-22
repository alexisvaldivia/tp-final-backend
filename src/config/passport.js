import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../modules/users/user.model.js';
import envs from './envs.js';

const configurePassport = (passportInstance) => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: envs.JWT_SECRET,
	};

	passportInstance.use(
		new JwtStrategy(options, async (jwt_payload, done) => {
			try {
				const user = await UserModel.findByPk(jwt_payload.id);
				if (user) return done(null, user);
				return done(null, false);
			} catch (error) {
				return done(error, false);
			}
		})
	);
};

configurePassport(passport);

export default passport;