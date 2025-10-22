import express from 'express';
import envs from './config/envs.js';

import authRouter from './modules/auth/auth.router.js';

const app = express();

app.use(express.json());
app.use(authRouter);

app.set('port', envs.SERVER_PORT);

app.get('/', (req, res) => {
	res.send('TP Final Backend');
});

export default app;