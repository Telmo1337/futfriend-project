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
    teamA: z.string().optional(),
    teamB: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    type: gameTypeEnum.optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const joinGameSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    team: z.enum(['teamA', 'teamB']),
  }),
});


export const finishGameSchema = z.object({
  body: z.object({
    goalsA: z.number().int(),
    goalsB: z.number().int(),
  }),
  params: z.object({
    id: z.string(),
  }),
});
