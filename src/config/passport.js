import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../modules/users/user.model.js';
import envs from './envs.js';

export const configurePassport = (passport) => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: envs.JWT_SECRET
	};
	console.log();

	passport.use(
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
