// Serviço que gere inscrições, contagens e estatísticas de jogadores por jogo.
import { prisma } from '../../db/prisma.js';

export async function addPlayerToGame({ userId, gameId, team }) {
  // Carrega utilizador e jogo em paralelo para validar existência
  const [user, game] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.game.findUnique({ where: { id: gameId } }),
  ]);

  if (!user || !game) {
    return { error: 'User ou jogo não encontrado.', status: 404 };
  }

  // Garante que o campo team é válido antes de seguir
  if (!['teamA', 'teamB'].includes(team)) {
    return { error: 'Equipa inválida. Deve ser "teamA" ou "teamB".', status: 400 };
  }

  // Conta jogadores atuais por equipa para respeitar a lotação
  const [playersTeamA, playersTeamB] = await Promise.all([
    prisma.playersGame.count({ where: { gameId, team: 'teamA' } }),
    prisma.playersGame.count({ where: { gameId, team: 'teamB' } }),
  ]);

  const MAX_PLAYERS_PER_TEAM = game.maxPlayersPerTeam;

  if (team === 'teamA' && playersTeamA >= MAX_PLAYERS_PER_TEAM) {
    return { error: 'A Equipa A já está completa.', status: 400 };
  }
  if (team === 'teamB' && playersTeamB >= MAX_PLAYERS_PER_TEAM) {
    return { error: 'A Equipa B já está completa.', status: 400 };
  }

  const existing = await prisma.playersGame.findFirst({ where: { userId, gameId } });
  if (existing) {
    return { error: 'Jogador já está inscrito neste jogo.', status: 400 };
  }

  // Cria a participação do jogador no jogo
  const playerGame = await prisma.playersGame.create({
    data: { userId, gameId, team },
  });

  return { playerGame };
}

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
    players,
  };
}