// Rotas de jogos: criação, consulta, atualização e inscrição de jogadores.
import { Router } from 'express';
import {
  addPlayerToGameController,
  createGameController,
  deleteGameController,
  getGameByIdController,
  getGamesController,
  updateGameController,
} from '../controllers/gameController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { authGuard } from '../utils/auth.js';
import { addPlayerToGameSchema, createGameSchema, updateGameSchema } from '../schemas/gameSchemas.js';



const gameRouter = Router();


gameRouter.post('/', authGuard, validateRequest(createGameSchema), createGameController);
gameRouter.get('/', getGamesController);
gameRouter.get('/:id', getGameByIdController);
gameRouter.put('/:id', authGuard, validateRequest(updateGameSchema), updateGameController);
gameRouter.delete('/:id', authGuard, deleteGameController);
gameRouter.post('/:id/players', authGuard, validateRequest(addPlayerToGameSchema), addPlayerToGameController);

export default gameRouter;