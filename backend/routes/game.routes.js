import {Router} from 'express';
import {prisma} from '../db/prisma.js';


const gameRouter = Router();    

//criar novo jogo
gameRouter.post('/', async (req, res) => {
    try {
        const {
            teamA,
            teamB,
            date,
            location,
            createdById,
        } = req.body;

        const newGame = await prisma.game.create({
            data: {
                teamA,
                teamB,
                date: new Date(date),
                location,
                createdById,
            },

            include: {
                createdBy: true,
            }
        });

        res.status(201).json(newGame);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'err while creating game' });
    }
});



//obter todos os jogos
gameRouter.get('/', async (req, res) => {

    try {
        const games = await prisma.game.findMany({
            orderBy: {
                date: 'desc'
            }
        });

        res.status(200).json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'err while getting games' });
    }
});



//obter jogo por id
gameRouter.get('/:id', async (req, res) => {
    try {

        const { id} = req. params;

        const game = await prisma.game.findUnique({

            where: {
                id
            }
        })
        //verificar se o jogo existe
        if(!game){
            return res.status(404).json({ err: 'game not found'});
        }

        res.status(200).json(game);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'err while getting game by id' });
    }
});



//dar update a um jogo via id
gameRouter.put('/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const {
            teamA,
            teamB,
            date,
            location,
            state,
            goalsA,
            goalsB
        } = req.body;

        const updatedGame = await prisma.game.update({
            where: {
                id
            },
            data: {
                teamA,
                teamB,
                date: new Date(date),
                location,
                state,
                goalsA,
                goalsB
            }
        });

        res.status(200).json(updatedGame);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'err while updating game' });
    }
})


//apgar jogo
gameRouter.delete('/:id', async (req, res) => {

    try {
        const {id}  = req.params;

        await prisma.game.delete({
            where: {
                id
            }
        });

        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'err while deleting game' });
    }
})

export default gameRouter;