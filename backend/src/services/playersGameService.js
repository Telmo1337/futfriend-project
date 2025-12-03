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




//para ver número total de jogadores inscritos num jogo DEPOIS UTILIZAR NO UI
export async function getGameParticipants(gameId) {
  const total = await prisma.playersGame.count({ where: { gameId } });
  return { gameId, totalParticipants: total };
}


export async function updatePlayerStats(id, data, user) {
  const pg = await prisma.playersGame.findUnique({
    where: { id },
    include: { game: true }
  });

  if (!pg) {
    throw new Error("Participação não encontrada.");
  }

  // Apenas criador do jogo ou ADMIN podem alterar
  if (user.id !== pg.game.createdById && user.role !== "ADMIN") {
    throw new Error("Não tens permissão para alterar estatísticas deste jogador.");
  }

  return prisma.playersGame.update({
    where: { id },
    data,
  });
}
