// Schemas de validação para operações relacionadas com jogos.
import { z } from 'zod';

const gameTypeEnum = z.enum(['FIVE_A_SIDE', 'SEVEN_A_SIDE', 'ELEVEN_A_SIDE']);

export const createGameSchema = z.object({
  body: z.object({
    teamA: z.string().min(1),
    teamB: z.string().min(1),
    date: z.string().min(1),
    location: z.string().min(1),
    type: gameTypeEnum
  }),
});

export const updateGameSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    teamA: z.string().optional(),
    teamB: z.string().optional(),
    date: z.string().optional(),
    location: z.string().optional(),
    type: gameTypeEnum.optional(),
    maxPlayersPerTeam: z.number().int().optional(),
    state: z.enum(["scheduled", "ongoing", "finished"]).optional(),
    goalsA: z.number().int().min(0).optional(),
    goalsB: z.number().int().min(0).optional(),
  }),
});

export const joinGameSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    team: z.enum(['teamA', 'teamB']),
  }),
});

export const finishGameSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.any().optional()
});
