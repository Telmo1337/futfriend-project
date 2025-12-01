// Rotas que gerem inscrições e estatísticas de jogadores por jogo.
import { Router } from 'express';

import {
  countPlayersByGameController,
  createPlayersGameController,
  getPlayersByGameController,
  updatePlayersGameController,
} from '../controllers/playersGameController.js';

import { validateRequest } from '../middlewares/validateRequest.js';
import { authGuard } from '../utils/auth.js';

import {
  createPlayersGameSchema,
  playersByGameSchema,
  updatePlayersGameSchema,
} from '../schemas/playerGameSchemas.js';



const playersGameRouter = Router();

playersGameRouter.post('/', authGuard, validateRequest(createPlayersGameSchema), createPlayersGameController);
playersGameRouter.get('/game/:gameId/players', authGuard, validateRequest(playersByGameSchema),getPlayersByGameController);
playersGameRouter.put('/:id', authGuard, validateRequest(updatePlayersGameSchema), updatePlayersGameController);
playersGameRouter.get('/game/:gameId', authGuard, validateRequest(playersByGameSchema), countPlayersByGameController);

export default playersGameRouter;