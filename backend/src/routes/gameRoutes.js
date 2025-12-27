// Rotas de jogos
import { Router } from 'express';
import {
  joinGameController,
  createGameController,
  deleteGameController,
  getGameByIdController,
  getGamesController,
  updateGameController,
  finishGameController,
  startGameController,
} from '../controllers/gameController.js';

import { validateRequest } from '../middlewares/validateRequest.js';
import { authGuard } from '../utils/auth.js';

import {
  createGameSchema,
  updateGameSchema,
  joinGameSchema,
  finishGameSchema
} from '../schemas/gameSchemas.js';

const gameRouter = Router();

// Criar jogo
gameRouter.post('/', authGuard, validateRequest(createGameSchema), createGameController);

// Listar jogos
gameRouter.get('/', authGuard, getGamesController);

// Ver jogo
gameRouter.get('/:id', authGuard, getGameByIdController);

// Atualizar dados gerais + resultado
gameRouter.put('/:id', authGuard, validateRequest(updateGameSchema), updateGameController);

// Finalizar (aplicar estatísticas)
gameRouter.put('/:id/finish', authGuard, validateRequest(finishGameSchema), finishGameController);

// Apagar jogo
gameRouter.delete('/:id', authGuard, deleteGameController);

// Entrar no jogo (lobby)
gameRouter.post('/:id/join', authGuard, validateRequest(joinGameSchema), joinGameController);

// Iniciar jogo
gameRouter.put('/:id/start', authGuard, startGameController);


export default gameRouter;
