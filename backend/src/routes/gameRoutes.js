// Rotas de jogos: criação, consulta, atualização e inscrição de jogadores.
import { Router } from 'express';
import {
  joinGameController,
  createGameController,
  deleteGameController,
  getGameByIdController,
  getGamesController,
  updateGameController,
} from '../controllers/gameController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { authGuard } from '../utils/auth.js';
import {  createGameSchema, updateGameSchema, joinGameSchema } from '../schemas/gameSchemas.js';



const gameRouter = Router();


gameRouter.post('/', authGuard, validateRequest(createGameSchema), createGameController);
gameRouter.get('/', authGuard, getGamesController);
gameRouter.get('/:id', authGuard, getGameByIdController);
gameRouter.put('/:id', authGuard, validateRequest(updateGameSchema), updateGameController);
gameRouter.delete('/:id', authGuard, deleteGameController);
gameRouter.post('/:id/join', authGuard, validateRequest(joinGameSchema), joinGameController);


export default gameRouter;