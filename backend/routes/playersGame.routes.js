import {Router} from 'express';
import {prisma} from '../db/prisma.js';



const playersGameRouter = Router(); 

//associar jogador a um jogo
playersGameRouter.post('/', async (req, res) => {

    try {
        const {
            userId,
            gameId,
            team
        } = req.body;


        //verificação se user e o jogo existem
        const [user, game] = await Promise.all([
            prisma.user.findUnique({ where: { id: userId } }),
            prisma.game.findUnique({ where: { id: gameId } })
        ]);

        if (!user || !game) {
            return res.status(404).json({ error: 'user or game not found' });
        }


        //criar relação entre jogador e jogo
        const playerGame = await prisma.playersGame.create({
            data: {
                userId,
                gameId,
                team
            }
        });

        res.status(201).json(playerGame);   
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'error associating player to game' });
    }
});



//get todos os jogadores de um determinado jogo
playersGameRouter.get('game/:gameId/players', async (req, res) => {
    try {
        const { gameId } = req.params;
        const playersGames = await prisma.playersGame.findMany({
            where: { gameId },
        });
        res.status(200).json(playersGames);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'error fetching players for the game' });
    }
});


//update estatisticas do jogador num jogo
playersGameRouter.put('/:id', async (req, res) => {
    try {
        const {id } = req.params;

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
        console.log(err);
        res.status(500).json({ err: 'error updating player game stats' });
    }
})



// contar nº de jogadores num jogo
playersGameRouter.get('/game/:gameId', async (req, res) => {
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
    console.error(err);
    res.status(500).json({ error: 'err listing players for game' });
  }
});




export default playersGameRouter;