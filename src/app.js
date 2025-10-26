import express from 'express';
import envs from './config/envs.js';
import passport from './config/passport.js';
import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/users/user.router.js';
import projectRouter from './modules/projects/project.router.js';
import fundingRouter from './modules/funding/funding.router.js';

const app = express();

app.set('port', envs.SERVER_PORT);

app.use(express.json());

// Configurar Passport antes de inicializarlo
app.use(passport.initialize());

app.use(authRouter);
app.use(userRouter);
app.use(projectRouter);
app.use(fundingRouter);

app.get('/', (req, res) => {
	res.send('TP Final Backend Alexis Valdivia');
});

export default app;
