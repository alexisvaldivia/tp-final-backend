import express from 'express';
import envs from './config/envs.js';

const app = express();

app.use(express.json());

app.set('port', envs.SERVER_PORT);

app.get('/', (req, res) => {
	res.send('TP Final Backend');
});

export default app;