// Controladores responsáveis por gerir participação e estatísticas
// dos jogadores em cada jogo.
import {
  getGameParticipants,
  getPlayersByGame,
  updatePlayerStats,
} from '../services/playersGameService.js';



export async function getPlayersByGameController(req, res, next) {
  try {
    const { gameId } = req.validated.params;
    // Recupera todos os jogadores associados a um jogo
    const playersGames = await getPlayersByGame(gameId);
    res.status(200).json(playersGames);
  } catch (err) {
    next(err);
  }
}

export async function updatePlayersGameController(req, res, next) {
  try {
    const { id } = req.validated.params;

    const updated = await updatePlayerStats(
      id,
      req.validated.body,
      req.user 
    );

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}


export async function countPlayersByGameController(req, res, next) {
  try {
    const { gameId } = req.validated.params;
    // Devolve contagem agregada por equipa para controlar capacidade
    const result = await getGameParticipants(gameId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}