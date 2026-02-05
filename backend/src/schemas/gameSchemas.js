// Schemas de validação para operações relacionadas com jogos.
import { z } from 'zod';

/**
 * Tipos de jogo permitidos:
 * - FIVE_A_SIDE: 5x5 (máximo 5 jogadores por time = 10 jogadores total)
 * - SEVEN_A_SIDE: 7x7 (máximo 7 jogadores por time = 14 jogadores total)
 * - ELEVEN_A_SIDE: 11x11 (máximo 11 jogadores por time = 22 jogadores total)
 */
const gameTypeEnum = z.enum(['FIVE_A_SIDE', 'SEVEN_A_SIDE', 'ELEVEN_A_SIDE'])
  .describe('Tipo de jogo: FIVE_A_SIDE (5x5), SEVEN_A_SIDE (7x7), ou ELEVEN_A_SIDE (11x11)');

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
    // maxPlayersPerTeam é definido automaticamente com base no tipo de jogo
    // 5x5 (FIVE_A_SIDE): 5 jogadores por time
    // 7x7 (SEVEN_A_SIDE): 7 jogadores por time  
    // 11x11 (ELEVEN_A_SIDE): 11 jogadores por team
    maxPlayersPerTeam: z.number().int().optional(),
    playersGoals: z.array(
      z.object({
        playerGameId: z.string(),
        goals: z.number().int().min(0),
      })
    ).optional(),
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
