/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { hashPassword, checkPassword, generateToken } from '../utils/auth.js';
import {z} from 'zod';

const authRouter = Router();

//validação registo com zod
const registerSchema = z.object({
  email: z.string().email('invalid email'),
  name: z.string().min(2, 'name short'),
  password: z.string().min(6, 'atleast 6 chars')
});

//registo
authRouter.post('/register', async (req, res, next) => {
  try {

     const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { email, name, password } = result.data;

    // verificar se já existe utilizador
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'email already register' });
    }

    // hash da password
    const hashedPassword = await hashPassword(password);

    // criar novo utilizador
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    // criar token JWT
    const token = generateToken(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword, token });

  } catch (err) {
    next(err);
  }
});

//validação login com zod
const loginSchema = z.object({
  email: z.string().email('invalid email'),
  password: z.string().min(1, 'required password')
});


//login
authRouter.post('/login', async (req, res, next) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const valid = await checkPassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'incorrect password' });
    }

    const token = await generateToken(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword, token });


  } catch (err) {
    next(err);
  }
});






export default authRouter;
