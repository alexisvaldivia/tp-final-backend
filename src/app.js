import express from 'express';
import envs from './config/envs.js';
import passport from './config/passport.js';
import authRouter from './modules/auth/auth.router.js';

const app = express();

app.set('port', envs.SERVER_PORT);

app.use(express.json());

// Configurar Passport antes de inicializarlo
app.use(passport.initialize());

app.use(authRouter);

app.get('/', (req, res) => {
  res.send('TP Final Backend');
});

export default app;