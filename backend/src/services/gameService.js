// Serviço responsável por gerir regras de negócio e persistência de jogos.
import { prisma } from '../../db/prisma.js';

// Número máximo de jogadores por equipa para cada tipo de jogo.
const MAX_PLAYERS_PER_TYPE = {
  FIVE_A_SIDE: 5,
  SEVEN_A_SIDE: 7,
  ELEVEN_A_SIDE: 11,
};

export async function createGame(data, userId) {
  // Calcula tamanho de equipa consoante o tipo e cria o registo
  const maxPlayersPerTeam = MAX_PLAYERS_PER_TYPE[data.type];

  return prisma.game.create({
    data: {
      ...data,
      createdById: userId,
      maxPlayersPerTeam,
    },
    include: {
      createdBy: {
        select: {
          nickname: true,
          createdAt: true,
          updatedAt: true,
        }
      }
    }
  });

}

export async function getAllGames(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const total = await prisma.game.count();

  const games = await prisma.game.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      createdBy: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    games,
  };
}


export async function getGameById(id) {
  // Busca jogo e inclui jogadores inscritos para detalhar equipas
  return prisma.game.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      playersGame: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
  });
}

export async function updateGame(id, data, userId) {
  // Verifica existência do jogo
  const game = await prisma.game.findUnique({ where: { id } });
  if (!game) return { error: 'Jogo não encontrado.', status: 404 };

  // Apenas o criador do jogo pode atualizar
  if (game.createdById !== userId) {
    return { error: 'Não está autorizado a editar este jogo.', status: 403 };
  }

  // Prepara objeto de updates apenas com campos enviados
  const updates = {};
  if (data.teamA !== undefined) updates.teamA = data.teamA;
  if (data.teamB !== undefined) updates.teamB = data.teamB;
  if (data.location !== undefined) updates.location = data.location;
  if (data.state !== undefined) updates.state = data.state;
  if (data.goalsA !== undefined) updates.goalsA = Number(data.goalsA);
  if (data.goalsB !== undefined) updates.goalsB = Number(data.goalsB);

  if (data.date !== undefined) {
    const parsedDate = new Date(data.date);
    if (isNaN(parsedDate.getTime())) {
      return { error: 'Data inválida.', status: 400 };
    }
    updates.date = parsedDate;
  }

  const updatedGame = await prisma.game.update({
    where: { id },
    data: updates,
  });

  return { game: updatedGame };
}

export async function deleteGame(id, userId) {
  // Apenas o criador pode remover o jogo
  const game = await prisma.game.findUnique({ where: { id } });
  if (!game) return { error: 'Jogo não encontrado.', status: 404 };

  if (game.createdById !== userId) {
    return { error: 'Não está autorizado a apagar este jogo.', status: 403 };
  }

  await prisma.game.delete({ where: { id } });
  return { success: true };
}

export async function joinGame(gameId, userId, team) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  if (!game) {
    return { error: 'Jogo não encontrado.', status: 404 };
  }

  // Verificar se já está inscrito
  const existing = await prisma.playersGame.findFirst({
    where: { userId, gameId },
  });

  if (existing) {
    return { error: 'Já estás inscrito neste jogo.', status: 400 };
  }

  // Verificar limite da equipa
  const countTeam = await prisma.playersGame.count({
    where: { gameId, team },
  });

  if (countTeam >= game.maxPlayersPerTeam) {
    return { error: `A equipa ${team} está cheia.`, status: 400 };
  }

  // Criar ligação jogador-jogo
  const playerGame = await prisma.playersGame.create({
    data: {
      userId,
      gameId,
      team,
    },
    include: {
      user: {
        select: { id: true, nickname: true, firstName: true, lastName: true },
      },
    },
  });

  return { playerGame };
}
