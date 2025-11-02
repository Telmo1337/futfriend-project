import { Router } from 'express';
import {prisma } from '../db/prisma.js';


const userRouter = Router();


//criar novo user
userRouter.post('/', async (req, res, next) => {
    try {
        //logica para criar novo user
        const {
            email,
            firstName,
            lastName,
            password
        } = req.body;
        //criar user no banco de dados
        const newUser = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password
            },
        });

        res.status(201).json(newUser)
    } catch(err) {
        console.log(err)
        
        if (err.code === 'P2002') {
        // Prisma error code for unique constraint violation
        return res.status(400).json({
            error: 'theres already a user with this email',
        });
        }
        next(err);
    }
});



//obter todos os users
userRouter.get('/', async (req, res, next) => {
    //logica
    try {
        //obter todos os users do banco de dados
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
})


//obter user por id
userRouter.get('/:id', async (req, res,next) => {
    try{
        const {
            id
        } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id
            },
        });

        //se user nao for encontrado
        if(!user){
            return res.status(404).json({
                err: 'user not found'
            });
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});



//atualizar user por id
userRouter.put('/:id', async (req, res,next) => {
    try {
        const {
            id
        } = req.params;

        const {
            email,
            firstName,
            lastName,
            password,
            goals,
            victories,
            losses,
            draws
        } = req.body;

        const updateUser = await prisma.user.update({
            where: {
                id
            },

            data: {
                email,
                firstName,
                lastName,
                password,
                goals,
                victories,
                losses,
                draws
            }
        });

        res.status(200).json(updateUser);
    } catch (err) {
        next(err);
    }
})



//delete user por id
userRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // apgar as participations do user
    await prisma.playersGame.deleteMany({
      where: { userId: id },
    });

    //apga jogos criados por ele
    await prisma.game.deleteMany({
      where: { createdById: id },
    });

    // apagar o user apenas
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({
        message: "user deleted"
    })
  } catch (err) {
      next(err);
    }
});



export default userRouter;