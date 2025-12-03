// Serviço que gere inscrições, contagens e estatísticas de jogadores por jogo.
import { prisma } from '../../db/prisma.js';



export async function getPlayersByGame(gameId) {
  return prisma.playersGame.findMany({
    where: { gameId },
    include: {
      user: {
        select: {
          id: true,
          nickname: true
        }
      }
    }
  });
}


export async function getGameById(id) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: {
          id: true,
          nickname: true
        }
      },
      playersGame: {
        select: {
          id: true,
          team: true,
          goals: true,
          user: {
            select: {
              id: true,
              nickname: true
            }
          }
        }
      }
    }
  });
}



export async function getGameParticipants(gameId) {
  const total = await prisma.playersGame.count({ where: { gameId } });
  return { gameId, totalParticipants: total };
}



export async function updatePlayerStats(id, data) {
  return prisma.playersGame.update({
    where: { id },
    data,
  });
}