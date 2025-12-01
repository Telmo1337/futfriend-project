// Rotas de utilizadores: criação, gestão de perfil e estatísticas.
import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  searchUsersController,
  updateUserController,
  userStatsController,
} from '../controllers/userController.js';

import { validateRequest } from '../middlewares/validateRequest.js';
import { authGuard } from '../utils/auth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { canDeleteUser } from '../middlewares/canDeleteUser.js';
import { canUpdateUser } from '../middlewares/canUpdateUser.js';

import {
  createUserSchema,
  updateUserSchema,
  userIdSchema
} from '../schemas/userSchemas.js';




const userRouter = Router();

// REGISTO (não precisa auth)
userRouter.post('/', validateRequest(createUserSchema), createUserController);

// ESTATÍSTICAS DO PROPRIO USER
userRouter.get('/me/stats', authGuard, userStatsController);

// PESQUISA (só autenticados)
userRouter.get('/search', authGuard, searchUsersController);

// LISTAR TODOS (só ADMIN)
userRouter.get('/', authGuard, isAdmin, getUsersController);

// OBTÉM UM USER POR ID (tem de estar autenticado)
userRouter.get('/:id', authGuard, validateRequest(userIdSchema), getUserByIdController);

// UPDATE DE PERFIL (tem de estar autenticado)
userRouter.put('/:id', authGuard, validateRequest(updateUserSchema), canUpdateUser, updateUserController);

// APAGAR USER (tem de estar autenticado)
userRouter.delete('/:id', authGuard, validateRequest(userIdSchema), canDeleteUser, deleteUserController);

export default userRouter;
