// Schemas para validar criação, atualização e recuperação de utilizadores.
import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    // Dados mínimos para criar um utilizador
    email: z.string().email('Email inválido'),
    firstName: z.string().min(1, 'Primeiro nome é obrigatório'),
    lastName: z.string().min(1, 'Último nome é obrigatório'),
    password: z.string().min(6, 'Password deve ter pelo menos 6 caracteres'),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    // Campos opcionais que podem ser atualizados via endpoint
    email: z.string().email('Email inválido').optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional(),
    goals: z.number().int().optional(),
    victories: z.number().int().optional(),
    losses: z.number().int().optional(),
    draws: z.number().int().optional(),
  }),
});

export const userIdSchema = z.object({
  // Validado quando precisamos de um id de utilizador na rota
  params: z.object({ id: z.string() }),
});