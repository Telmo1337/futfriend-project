// Schemas para validar inscrições e atualizações de jogadores nos jogos.
import { z } from 'zod';


export const updatePlayersGameSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    // Estatísticas editáveis pelo criador ou administrador
    goals: z.number().int().optional(),
    score: z.number().optional(),
  }),
});

export const playersByGameSchema = z.object({
  // Usado para listar jogadores de um jogo específico
  params: z.object({ gameId: z.string() }),
});