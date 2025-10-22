import app from './app.js';
import sequelize from './config/database.js';

sequelize
	.sync({ alter: true })
	.then(() => {
		console.log('DB sincronizada');
		const port = app.get('port');
		app.listen(port, () =>
			console.log(`Servidor corriendo en http://localhost:${port}`)
		);
	})
	.catch((err) => console.log('Error al conectar DB:', err));