import { Router } from 'express';
import {prisma } from '../db/prisma.js';


const userRouter = Router();


//criar novo user
userRouter.post('/', async (req, res) => {
    try {
        //logica para criar novo user
        const {
            email,
            name,
            password
        } = req.body;
        //criar user no banco de dados
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password
            },
        });

        res.status(201).json(newUser)
    } catch(err) {
        console.log(err)
        
        if (err.code === 'P2002') {
        // Prisma error code for unique constraint violation
        return res.status(400).json({
            error: 'Já existe um utilizador registado com esse email.',
        });
        }
        res.status(500).json({err: 'error creating user'})
    }
});



//obter todos os users
userRouter.get('/', async (req, res) => {
    //logica
    try {
        //obter todos os users do banco de dados
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        //erro handling
        console.log(err);
        res.status(500).send({ error: 'erro ao tentar aceder aos users' });
    }
})


//obter user por id
userRouter.get('/:id', async (req, res) => {
    try{
        const {
            id
        } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
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
        console.log(err)
        res.status(500).json({
            err: 'err getting user'
        })
    }
});



//atualizar user por id
userRouter.put('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const {
            email,
            name,
            password,
            goals,
            victories,
            losses,
            draws
        } = req.body;

        const updateUser = await prisma.user.update({
            where: {
                id: Number(id)
            },

            data: {
                email,
                name,
                password,
                goals,
                victories,
                losses,
                draws
            }
        });

        res.status(200).json(updateUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            err: 'error updating user'
        });
    }
})



//delete user por id
userRouter.delete('/:id', async (req, res) => {
    try {
        const { 
            id
        } = req.params;

        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(204).send(
            {
                message: 'user deleted successfully'
            }
        );
    } catch (err) {
        console.log(err)
        res.status(500).json({
            err: 'error deleting user'
        });
    }
})



export default userRouter;