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
import { createUserSchema, updateUserSchema, userIdSchema } from '../schemas/userSchemas.js';



const userRouter = Router();


userRouter.post('/', validateRequest(createUserSchema), createUserController);
userRouter.get('/me/stats', authGuard, userStatsController);
userRouter.get('/search', authGuard, searchUsersController);
userRouter.get('/', getUsersController);
userRouter.get('/:id', validateRequest(userIdSchema), getUserByIdController);
userRouter.put('/:id', validateRequest(updateUserSchema), updateUserController);
userRouter.delete('/:id', validateRequest(userIdSchema), deleteUserController);

export default userRouter;