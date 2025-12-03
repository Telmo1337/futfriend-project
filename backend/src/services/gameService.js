import { prisma } from "../../db/prisma.js";

/* ============================================================
   1. Criar jogo
============================================================ */
export async function createGame(data, userId) {
  return prisma.game.create({
    data: {
      ...data,
      createdById: userId,
    },
  });
}

/* ============================================================
   2. Listar jogos (com paginação)
============================================================ */
export async function getAllGames(page, limit) {
  const skip = (page - 1) * limit;

  const [games, total] = await Promise.all([
    prisma.game.findMany({
      skip,
      take: limit,
      include: {
        createdBy: {
          select: { id: true, nickname: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),

    prisma.game.count(),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    games,
  };
}

/* ============================================================
   3. Obter jogo por ID
============================================================ */
export async function getGameById(id) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, nickname: true } },
      playersGame: {
        include: {
          user: { select: { nickname: true} },
        },
      },
    },
  });
}

/* ============================================================
   4. Atualizar dados gerais de um jogo
      (data, local, equipas, tipo, etc.)
============================================================ */
export async function updateGame(gameId, data, user) {
  const game = await prisma.game.findUnique({ where: { id: gameId } });

  if (!game) {
    return { error: "Jogo não encontrado.", status: 404 };
  }

  // Permissões
  if (user.id !== game.createdById && user.role !== "ADMIN") {
    return { error: "Não tens permissão para atualizar este jogo.", status: 403 };
  }

  // Se o jogo estiver finalizado, NÃO permitir alterações
  if (game.state === "finished") {
    return { 
      error: "Não é possível alterar um jogo que já foi finalizado.", 
      status: 400 
    };
  }

  // Atualização permitida
  const updated = await prisma.game.update({
    where: { id: gameId },
    data,
  });

  return { game: updated };
}


/* ============================================================
   5. Finalizar jogo + atualizar estatísticas dos jogadores
============================================================ */
export async function finishGame(gameId, user) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { playersGame: true },
  });

  if (!game) {
    return { error: "Jogo não encontrado.", status: 404 };
  }

  if (user.id !== game.createdById && user.role !== "ADMIN") {
    return { error: "Sem permissão.", status: 403 };
  }

  if (game.state === "finished") {
    return { error: "Jogo já foi finalizado.", status: 400 };
  }

  // -------------------------------------
  // 1. Calcular resultado automaticamente
  // -------------------------------------
  const goalsA = game.playersGame
    .filter(pg => pg.team === "teamA")
    .reduce((acc, pg) => acc + pg.goals, 0);

  const goalsB = game.playersGame
    .filter(pg => pg.team === "teamB")
    .reduce((acc, pg) => acc + pg.goals, 0);

  // Determinar vencedor
  let winner = null;
  if (goalsA > goalsB) winner = "teamA";
  if (goalsB > goalsA) winner = "teamB";

  // -------------------------------------
  // 2. Atualizar estatísticas de cada user
  // -------------------------------------
  for (const pg of game.playersGame) {
    await prisma.user.update({
      where: { id: pg.userId },
      data: {
        goals: { increment: pg.goals },
        victories: { increment: winner === pg.team ? 1 : 0 },
        losses: { increment: winner && winner !== pg.team ? 1 : 0 },
        draws: { increment: winner === null ? 1 : 0 },
      },
    });
  }

  // -------------------------------------
  // 3. Finalizar jogo + guardar resultado
  // -------------------------------------
  const finishedGame = await prisma.game.update({
    where: { id: gameId },
    data: {
      goalsA,
      goalsB,
      state: "finished",
    }
  });

  return { game: finishedGame };
}


/* ============================================================
   6. Apagar jogo
============================================================ */
export async function deleteGame(gameId, userId) {
  const game = await prisma.game.findUnique({ where: { id: gameId } });

  if (!game) {
    return { error: "Jogo não encontrado.", status: 404 };
  }

  // Apenas criador OU admin apaga
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (game.createdById !== userId && user.role !== "ADMIN") {
    return { error: "Não tens permissão para apagar este jogo.", status: 403 };
  }

  await prisma.playersGame.deleteMany({ where: { gameId } });
  await prisma.game.delete({ where: { id: gameId } });

  return { success: true };
}

/* ============================================================
   7. Entrar num jogo
============================================================ */
export async function joinGame(gameId, userId, team) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { playersGame: true },
  });

  if (!game) return { error: "Jogo não encontrado.", status: 404 };

  if (game.state !== "scheduled") {
    return { error: "O jogo já começou ou terminou.", status: 400 };
  }

  // Ver se o user já está no jogo
  const exists = await prisma.playersGame.findUnique({
    where: { userId_gameId: { userId, gameId } },
  });

  if (exists) {
    return { error: "Já estás inscrito neste jogo.", status: 400 };
  }

  // Contar jogadores por equipa
  const countTeam = game.playersGame.filter(p => p.team === team).length;

  if (countTeam >= game.maxPlayersPerTeam) {
    return {
      error: `A equipa ${team} já está cheia.`,
      status: 400,
    };
  }

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
