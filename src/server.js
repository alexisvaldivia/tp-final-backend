import app from './app.js';
import sequelize from './config/database.js';

import http from 'http';
import { Server } from 'socket.io';
import { socketHandler } from './sockets/notifications.js';

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
	cors: '*',
});

socketHandler(io);

app.set('io', io);

sequelize
	.sync({ alter: true })
	.then(() => {
		console.log('DB sincronizada');
		const port = app.get('port');
		/* 		app.listen(port, () => {

			console.log(`Servidor corriendo en http://localhost:${port}`);
		}); */
		httpServer.listen(port, () => {});
	})
	.catch((err) => console.log('Error al conectar DB:', err));
