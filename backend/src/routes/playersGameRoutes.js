// Rotas que gerem inscrições e estatísticas de jogadores por jogo.
import { Router } from 'express';

import {
  countPlayersByGameController,
  createPlayersGameController,
  getPlayersByGameController,
  updatePlayersGameController,
} from '../controllers/playersGameController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  createPlayersGameSchema,
  playersByGameSchema,
  updatePlayersGameSchema,
} from '../schemas/playerGameSchemas.js';



const playersGameRouter = Router();

playersGameRouter.post('/', validateRequest(createPlayersGameSchema), createPlayersGameController);
playersGameRouter.get('/game/:gameId/players', validateRequest(playersByGameSchema),getPlayersByGameController);
playersGameRouter.put('/:id', validateRequest(updatePlayersGameSchema), updatePlayersGameController);
playersGameRouter.get('/game/:gameId', validateRequest(playersByGameSchema), countPlayersByGameController);


export default playersGameRouter;