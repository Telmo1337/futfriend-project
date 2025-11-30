// Rotas de autenticação: registo, login e verificação de token JWT.

import { Router } from 'express';

import {
  loginController,
  registerController,
  verifyController,
} from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../schemas/authSchemas.js';
import { authGuard } from '../utils/auth.js';


const authRouter = Router();


authRouter.post('/register', validateRequest(registerSchema), registerController);
authRouter.post('/login', validateRequest(loginSchema), loginController);
authRouter.get('/verify', authGuard, verifyController);

export default authRouter;