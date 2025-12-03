// Rotas de jogos: criação, consulta, atualização e inscrição de jogadores.
import { Router } from 'express';
import {
  joinGameController,
  createGameController,
  deleteGameController,
  getGameByIdController,
  getGamesController,
  updateGameController,
  finishGameController,
} from '../controllers/gameController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { authGuard } from '../utils/auth.js';
import {  createGameSchema, updateGameSchema, joinGameSchema, finishGameSchema } from '../schemas/gameSchemas.js';



const gameRouter = Router();

// Definição das rotas de jogos
// Rota para criar um novo jogo 
gameRouter.post('/', authGuard, validateRequest(createGameSchema), createGameController);

// Rota para obter a lista de jogos
gameRouter.get('/', authGuard, getGamesController);

// Rota para obter detalhes de um jogo específico
gameRouter.get('/:id', authGuard, getGameByIdController);


//alteraçoes do lobby do jogo
//  Atualizar dados gerais do jogo (local, data, nome das equipas, etc.
gameRouter.put('/:id', authGuard, validateRequest(updateGameSchema), updateGameController);
// Fechar o jogo (aplicar resultados + atualizar estatísticas)
gameRouter.put('/:id/finish', authGuard, validateRequest(finishGameSchema), finishGameController);




//lobby
// Rota para eliminar um jogo
gameRouter.delete('/:id', authGuard, deleteGameController);

// Rota para um jogador se inscrever em um jogo
gameRouter.post('/:id/join', authGuard, validateRequest(joinGameSchema), joinGameController);


export default gameRouter;