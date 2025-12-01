// Controladores de jogos: recebem requests e delegam nos serviços
// para aplicar regras de negócio e persistência.
import {
  joinGame,
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from '../services/gameService.js';

export async function createGameController(req, res, next) {
  try {
    // req.user é preenchido pelo authGuard e req.validated pelo validateRequest
    const newGame = await createGame(req.validated.body, req.user.id);
    res.status(201).json(newGame);
  } catch (err) {
    next(err);
  }
}

export async function getGamesController(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getAllGames(page, limit);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}


export async function getGameByIdController(req, res, next) {
  try {
    const { id } = req.params;
    // Inclui relação com criador e jogadores para renderização completa
    const game = await getGameById(id);

    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }

    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
}

export async function updateGameController(req, res, next) {
  try {
    const { id } = req.validated.params;
    // Apenas o criador pode atualizar; a regra é verificada no service
    const result = await updateGame(id, req.validated.body, req.user.id);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    res.status(200).json({
      message: 'Jogo atualizado com sucesso',
      game: result.game,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteGameController(req, res, next) {
  try {
    const { id } = req.params;
    // Deleção restrita ao criador do jogo
    const result = await deleteGame(id, req.user.id);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    res.status(200).json({ message: 'Jogo apagado com sucesso.' });
  } catch (err) {
    next(err);
  }
}

export async function joinGameController(req, res, next) {
  try {
    const { id } = req.params;
    const { team } = req.validated.body;

    // req.user.id vem do token
    const result = await joinGame(id, req.user.id, team);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    res.status(201).json({
      message: 'Entraste no jogo com sucesso.',
      player: result.playerGame,
    });

  } catch (err) {
    next(err);
  }
}
