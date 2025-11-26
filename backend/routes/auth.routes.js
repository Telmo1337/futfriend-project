/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { hashPassword, checkPassword, generateToken } from '../utils/auth.js';
import { z } from 'zod';
import { authGuard } from "../utils/auth.js";


const authRouter = Router();

//validação registo com zod
const registerSchema = z.object({
  email: z.string().email('invalid email'),
  firstName: z.string().min(2, 'first name short'),
  lastName: z.string().min(2, 'last name short'),
  nickname: z.string()
    .trim()
    .min(2, "Short nickname")
    .regex(/^\S+$/, "Nickname cannot contain spaces"),
  password: z.string().min(6, 'atleast 6 chars')
});


//validação login com zod
const loginSchema = z.object({
  identifier: z.string().min(1, "Email or nickname is required"),
  password: z.string().min(1, 'required password')
});


//registo
authRouter.post('/register', async (req, res, next) => {
  try {

    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { email, firstName, lastName, nickname, password } = result.data;

    // verificar se já existe utilizador
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email já está registado.' });
    }

    // hash da password
    const hashedPassword = await hashPassword(password);

    // criar novo utilizador
    const user = await prisma.user.create({
      data: { email, firstName, lastName, nickname, password: hashedPassword },
    });

    // criar token JWT
    const token = generateToken(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword, token });

  } catch (err) {
    next(err);
  }
});


//login
authRouter.post('/login', async (req, res, next) => {
  
  try {

    console.log("BODY RECEBIDO:", req.body);
    // validar dados de entrada
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const { identifier, password } = result.data;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { nickname: identifier }
        ]
      },
      select: { id: true, firstName: true, lastName: true, email: true, nickname: true, password: true }
    });

    // verificar se o utilizador existe
    if (!user) {
      return res.status(404).json({ error: 'Email ou password incorreta.' });
    }
    
    // verificar se a password está correta
    const valid = await checkPassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Email ou password incorreta.' });
    }

    const token = generateToken(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ user: userWithoutPassword, token });


  } catch (err) {
    next(err);
  }
});

authRouter.get("/verify", authGuard, async (req, res) => {
  try {
    // Se chegou até aqui, o token é válido
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, firstName: true, lastName: true, email: true, nickname: true }, // devolve dados básicos
    });

    if (!user) return res.status(404).json({ error: "user not found" });

    res.status(200).json({ user, valid: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});


export default authRouter;
