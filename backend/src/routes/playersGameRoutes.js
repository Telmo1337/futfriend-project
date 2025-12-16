import { Router } from 'express';

import {
  getPlayersByGameController,
  updatePlayersGameController,
  countPlayersByGameController,
  leaveGameController,
} from '../controllers/playersGameController.js';

import { validateRequest } from '../middlewares/validateRequest.js';
import { authGuard } from '../utils/auth.js';

import {
  playersByGameSchema,
  updatePlayersGameSchema,
} from '../schemas/playerGameSchemas.js';

const playersGameRouter = Router();

// Rota para obter jogadores de um jogo específico
playersGameRouter.get('/game/:gameId/players',authGuard,validateRequest(playersByGameSchema),getPlayersByGameController);
// Rota para atualizar informações do jogador em um jogo
playersGameRouter.put('/:id',authGuard,validateRequest(updatePlayersGameSchema),updatePlayersGameController);
// Rota para contar jogadores em um jogo específico
playersGameRouter.get('/game/:gameId', authGuard, validateRequest(playersByGameSchema),countPlayersByGameController);

// Sair do jogo (lobby)
playersGameRouter.delete(
  '/game/:gameId/leave',
  authGuard,
  validateRequest(playersByGameSchema),
  leaveGameController
);



export default playersGameRouter;
