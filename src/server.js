import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const server = () => {
	const port = app.get('port');
	app.listen(port);
	console.log(`Servidor iniciado en http://localhost:${port}`);
};

server();