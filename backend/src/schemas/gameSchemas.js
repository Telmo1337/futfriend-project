// Schemas de validação para operações relacionadas com jogos.
import { z } from 'zod';

const gameTypeEnum = z.enum(['FIVE_A_SIDE', 'SEVEN_A_SIDE', 'ELEVEN_A_SIDE']);

export const createGameSchema = z.object({
  body: z.object({
    // Dados mínimos para criar um jogo
    teamA: z.string().min(1, 'Team A é obrigatório'),
    teamB: z.string().min(1, 'Team B é obrigatório'),
    date: z.string().min(1, 'Data é obrigatória'),
    location: z.string().min(1, 'Localização é obrigatória'),
    type: gameTypeEnum,
  }),
});

export const updateGameSchema = z.object({
  body: z.object({
    // Atualização parcial dos campos do jogo
    teamA: z.string().optional(),
    teamB: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    state: z.string().optional(),
    goalsA: z.number().int().optional(),
    goalsB: z.number().int().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const addPlayerToGameSchema = z.object({
  body: z.object({
    // Utilizado quando um utilizador se inscreve num jogo
    email: z.string().email('Email inválido'),
    name: z.string().optional(),
    team: z.enum(['teamA', 'teamB']).optional(),
  }),
  params: z.object({ id: z.string() }),
});