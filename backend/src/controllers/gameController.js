// Controladores de jogos: recebem requests e delegam nos serviços
// para aplicar regras de negócio e persistência.

import {
  joinGame,
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
  finishGame,
  startGame
} from '../services/gameService.js';

/* -----------------------------
   Criar jogo
------------------------------ */
export async function createGameController(req, res, next) {
  try {
    const result = await createGame(req.validated.body, req.user.id);

    if (result?.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}


/* -----------------------------
   Listar jogos (com paginação)
------------------------------ */
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

/* -----------------------------
   Obter um jogo por ID
------------------------------ */
export async function getGameByIdController(req, res, next) {
  try {
    const { id } = req.params;
    const game = await getGameById(id);

    if (!game) {
      return res.status(404).json({ error: "Jogo não encontrado." });
    }

    res.status(200).json(game);

  } catch (err) {
    next(err);
  }
}

/* -----------------------------
   Atualizar dados gerais do jogo
------------------------------ */
export async function updateGameController(req, res, next) {
  try {
    const { id } = req.validated.params;
    const data = req.validated.body;
    const user = req.user;

    const result = await updateGame(id, data, user);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(200).json({
      message: "Jogo atualizado com sucesso.",
      game: result.game
    });

  } catch (err) {
    next(err);
  }
}

/* -----------------------------
   Finalizar jogo e aplicar estatísticas
------------------------------ */
export async function finishGameController(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;

    const result = await finishGame(id, user);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(200).json({
      message: "Jogo finalizado e estatísticas atualizadas.",
      game: result.game
    });

  } catch (err) {
    next(err);
  }
}

/* -----------------------------
   Apagar jogo
------------------------------ */
export async function deleteGameController(req, res, next) {
  try {
    const { id } = req.params;
    const result = await deleteGame(id, req.user.id);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    res.status(200).json({ message: 'Jogo apagado com sucesso.' });

  } catch (err) {
    next(err);
  }
}

/* -----------------------------
   Entrar num jogo (lobby)
------------------------------ */
export async function joinGameController(req, res, next) {
  try {
    const { id } = req.params;
    const { team } = req.validated.body;

    const result = await joinGame(id, req.user.id, team);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    res.status(201).json({
      message: "Entraste no jogo com sucesso.",
      player: result.playerGame
    });

  } catch (err) {
    next(err);
  }
}


/* -----------------------------
   Iniciar jogo
------------------------------ */
export async function startGameController(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;

    const result = await startGame(id, user);

    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.status(200).json({
      message: "Jogo iniciado com sucesso.",
      game: result.game,
    });
  } catch (err) {
    next(err);
  }
}
