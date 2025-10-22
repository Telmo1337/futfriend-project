import {Router} from 'express';
import {prisma} from '../db/prisma.js';
import { authGuard } from '../utils/auth.js';

const gameRouter = Router();    

//criar novo jogo apenas autenticados
gameRouter.post('/', authGuard, async (req, res, next) => {
    try {
        const {
            teamA,
            teamB,
            date,
            location,
        } = req.body;

        const newGame = await prisma.game.create({
            data: {
                teamA,
                teamB,
                date: new Date(date),
                location,
                createdById: req.user.id
            },

            include: {
                createdBy: true,
            }
        });

        res.status(201).json(newGame);
    } catch (err) {
        next(err);
    }
});



//obter todos os jogos
gameRouter.get('/', async (req, res, next) => {

    try {
        const games = await prisma.game.findMany({
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(200).json(games);
    } catch (err) {
        next(err);
    }
});



//obter jogo por id
gameRouter.get('/:id', async (req, res, next) => {
    try {

        
        const { id} = req. params;

        const game = await prisma.game.findUnique({

            where: {
                id
            },
            include: {
                playersGame: true
            }
        })
        //verificar se o jogo existe
        if(!game){
            return res.status(404).json({ err: 'game not found'});
        }

        res.status(200).json(game);
    } catch (err) {
        next(err);
    }
});



//dar update a um jogo via id
gameRouter.put('/:id', authGuard, async (req, res, next) => {

    try {

        
        const { id } = req.params;
        //dados para atualizar
        const {
            teamA,
            teamB,
            date,
            location,
            state,
            goalsA,
            goalsB
        } = req.body;


        const game = await prisma.game.findUnique({
            where: { id },
        });
        if (!game) {
            return res.status(404).json({ error: 'game not found' });
        }
        

        //verificar se o user autenticado é o criado do jogo
        if(game.createdById !== req.user.id){
            return res.status(403).json({ error: 'you are not authorized to update this game' });
        }
        
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

        res.status(200).json({
            message: 'Game updated successfully',
            game: updatedGame
        });

    } catch (err) {
        next(err);
    }
})


//apgar jogo
gameRouter.delete('/:id', authGuard, async (req, res, next) => {

    try {
        const {id}  = req.params;

        const game = await prisma.game.findUnique({
            where: {id},
        })
        if (!game) {
            return res.status(404).json({ error: 'game not found' });   
        }


        //verificar se o user autenticado é o criador do jogo
        if(game.createdById !== req.user.id){
            return res.status(403).json({ error: 'you are not authorized to delete this game' });
        }

        await prisma.game.delete({
            where: {
                id
            }
        });

        res.status(200).json({ message: 'game deleted successfully' }); 
    } catch (err) {
        next(err);
    }
})

    


export default gameRouter;