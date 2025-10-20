import express from 'express';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import gameRouter from './routes/game.routes.js';
import playersGameRouter from './routes/playersGame.routes.js';
import authRouter from './routes/auth.routes.js';


const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/players', playersGameRouter);
app.use('/api/v1/auth', authRouter);


//primeiro parametro é a rota, segundo é a função que será executada quando alguém acessar essa rota
app.get("/", (req, res) => {
    res.send('Welcome to my app Futfriend backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


export default app;