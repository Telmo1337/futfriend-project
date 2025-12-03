import { Router } from 'express';

import {
  getPlayersByGameController,
  updatePlayersGameController,
  countPlayersByGameController,
} from '../controllers/playersGameController.js';

import { validateRequest } from '../middlewares/validateRequest.js';
import { authGuard } from '../utils/auth.js';

import {
  playersByGameSchema,
  updatePlayersGameSchema,
} from '../schemas/playerGameSchemas.js';

const playersGameRouter = Router();

playersGameRouter.get('/game/:gameId/players',authGuard,validateRequest(playersByGameSchema),getPlayersByGameController);

playersGameRouter.put('/:id',authGuard,validateRequest(updatePlayersGameSchema),updatePlayersGameController);

playersGameRouter.get('/game/:gameId', authGuard, validateRequest(playersByGameSchema),countPlayersByGameController);

export default playersGameRouter;
