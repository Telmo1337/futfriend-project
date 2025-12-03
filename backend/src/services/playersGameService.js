// Serviço que gere inscrições, contagens e estatísticas de jogadores por jogo.
import { prisma } from '../../db/prisma.js';



export async function getPlayersByGame(gameId) {
  // Lista jogadores inscritos com os dados do utilizador incluídos
  const playersGames = await prisma.playersGame.findMany({
    where: { gameId },
    include: { user: true },
  });

  return playersGames;
}

export async function updatePlayerStats(id, data) {
  // Atualiza estatísticas como golos ou cartões
  const updated = await prisma.playersGame.update({
    where: { id },
    data,
  });

  return updated;
}

export async function getGameParticipants(gameId) {
  // Devolve lista completa e contagem para cada jogo
  const players = await prisma.playersGame.findMany({
    where: { gameId },
    include: { user: true },
  });

  return {
    gameId,
    totalParticipants: players.length,
  };
}