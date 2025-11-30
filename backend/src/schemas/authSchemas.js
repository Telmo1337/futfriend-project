// Schemas Zod para validar requests de autenticação.
import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    // Campos obrigatórios para registo de utilizador
    email: z.string().email('invalid email'),
    firstName: z.string().min(2, 'first name short'),
    lastName: z.string().min(2, 'last name short'),
    nickname: z
      .string()
      .trim()
      .min(2, 'Short nickname')
      .regex(/^\S+$/, 'Nickname cannot contain spaces'),
    password: z.string().min(6, 'atleast 6 chars'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    // identifier aceita email ou nickname
    identifier: z.string().min(1, 'Email or nickname is required'),
    password: z.string().min(1, 'required password'),
  }),
});