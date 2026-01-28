//importar packages
import express from 'express';
import cors from 'cors';

//importar variaveis de ambiente
import { PORT, ALLOWED_ORIGINS } from './config/env.js';

//importar rotas
import userRouter from './src/routes/userRoutes.js';
import gameRouter from './src/routes/gameRoutes.js';
import playersGameRouter from './src/routes/playersGameRoutes.js';
import authRouter from './src/routes/authRoutes.js';
import statsRouter from './src/routes/statsRouter.js';

//importar middleware global
import {errorHandler} from './src/middlewares/errorHandler.js';


const app = express();

app.use(express.json());

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
];

const allowedOrigins = ALLOWED_ORIGINS.length
  ? ALLOWED_ORIGINS
  : defaultAllowedOrigins;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some((entry) =>
      entry instanceof RegExp ? entry.test(origin) : entry === origin
    );

    return isAllowed
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // permite envio de cookies e headers de autenticação
}));



app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/players', playersGameRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/stats', statsRouter);


//primeiro parametro é a rota, segundo é a função que será executada quando alguém acessar essa rota
app.get("/", (req, res) => {
    res.send('Welcome to my app Futfriend backend!');
});


app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


export default app;