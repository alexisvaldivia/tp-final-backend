import app from './app.js';
import sequelize from './config/database.js';

sequelize
	.sync({ alter: true })
	.then(() => {
		console.log('DB sincronizada con éxito 🚀');
		app.listen(3000, () =>
			console.log('Servidor corriendo en http://localhost:3000')
		);
	})
	.catch((err) => console.log('Error al conectar DB:', err));