//importar packages
import express from 'express';
import cors from 'cors';

//importar variaveis de ambiente
import { PORT } from './config/env.js';

//importar rotas
import userRouter from './routes/user.routes.js';
import gameRouter from './routes/game.routes.js';
import playersGameRouter from './routes/playersGame.routes.js';
import authRouter from './routes/auth.routes.js';

//importar middleware global
import {errorHandler} from './middlewares/errorHandler.js';


const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // endpoint do frontend
  credentials: true, // permite envio de cookies e headers de autenticação
}));



app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/players', playersGameRouter);
app.use('/api/v1/auth', authRouter);


//primeiro parametro é a rota, segundo é a função que será executada quando alguém acessar essa rota
app.get("/", (req, res) => {
    res.send('Welcome to my app Futfriend backend!');
});


app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


export default app;