import { z } from 'zod';

export const updatePlayersGameSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    goals: z.number().int().optional(),
    score: z.number().optional(),
  }),
});

export const playersByGameSchema = z.object({
  params: z.object({ gameId: z.string() }),
});
