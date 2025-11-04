import { Router } from 'express';
import { prisma } from '../db/prisma.js';



const playersGameRouter = Router();

// associar jogador a um jogo
playersGameRouter.post('/', async (req, res, next) => {
  try {
    const { userId, gameId, team } = req.body;

    // verificar se user e jogo existem
    const [user, game] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.game.findUnique({ where: { id: gameId } })
    ]);

    if (!user || !game) {
      return res.status(404).json({ error: 'User ou jogo não encontrado.' });
    }

    // validar se equipa é válida (teamA ou teamB)
    if (!['teamA', 'teamB'].includes(team)) {
      return res.status(400).json({ error: 'Equipa inválida. Deve ser "teamA" ou "teamB".' });
    }

    // verificar número de jogadores já inscritos
    const [playersTeamA, playersTeamB] = await Promise.all([
      prisma.playersGame.count({ where: { gameId, team: 'teamA' } }),
      prisma.playersGame.count({ where: { gameId, team: 'teamB' } }),
    ]);

    // obter o limite do jogo
    const MAX_PLAYERS_PER_TEAM = game.maxPlayersPerTeam; // vem da BD

    // 5impedir que uma equipa ultrapasse o limite
    if (team === 'teamA' && playersTeamA >= MAX_PLAYERS_PER_TEAM) {
      return res.status(400).json({ error: 'A Equipa A já está completa.' });
    }
    if (team === 'teamB' && playersTeamB >= MAX_PLAYERS_PER_TEAM) {
      return res.status(400).json({ error: 'A Equipa B já está completa.' });
    }

    // verificar se o jogador já está inscrito nesse jogo
    const existing = await prisma.playersGame.findFirst({ where: { userId, gameId } });
    if (existing) {
      return res.status(400).json({ error: 'Jogador já está inscrito neste jogo.' });
    }

    //  criar relação entre jogador e jogo
    const playerGame = await prisma.playersGame.create({
      data: { userId, gameId, team },
    });

    res.status(201).json(playerGame);

  } catch (err) {
    next(err);
  }
});



//get todos os jogadores de um determinado jogo
playersGameRouter.get('/game/:gameId/players', async (req, res, next) => {
    try {
        const { gameId } = req.params;
        const playersGames = await prisma.playersGame.findMany({
            where: { gameId },
            include: { user: true },
        });
        res.status(200).json(playersGames);
    } catch (err) {
        next(err);
    }
});


//update estatisticas do jogador num jogo
playersGameRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            goals,
            score
        } = req.body;

        const updated = await prisma.playersGame.update({
            where: { id },
            data: {
                goals,
                score
            }
        });

        res.status(200).json(updated);

    } catch (err) {
        next(err);
    }
})



// contar nº de jogadores num jogo
playersGameRouter.get('/game/:gameId', async (req, res, next) => {
    try {
        const { gameId } = req.params;

        const players = await prisma.playersGame.findMany({
            where: { gameId },
            include: { user: true },
        });

        res.status(200).json({
            gameId,
            totalParticipants: players.length,
            players,
        });
    } catch (err) {
        next(err);
    }
});




export default playersGameRouter;