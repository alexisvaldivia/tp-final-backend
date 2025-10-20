// testConnection.js
import sequelize from './database.js';

async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log('✅ Conexión establecida correctamente.');
	} catch (error) {
		console.error('❌ No se pudo conectar:', error);
	} finally {
		await sequelize.close();
	}
}

testConnection();
