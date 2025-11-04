import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { authGuard } from "../utils/auth.js";

const gameRouter = Router();

/*
   Criar novo jogo (apenas utilizadores autenticados)
*/
gameRouter.post("/", authGuard, async (req, res, next) => {
  try {
    const { teamA, teamB, date, location, type } = req.body;

    //  Validação básica
    if (!teamA || !teamB || !date || !location || !type) {
      return res.status(400).json({ error: "Campos obrigatórios em falta." });
    }

    //  Validar tipo de jogo
    const validTypes = ["FIVE_A_SIDE", "SEVEN_A_SIDE", "ELEVEN_A_SIDE"];
    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ error: "Tipo de jogo inválido. Use 5x5, 7x7 ou 11x11." });
    }

    //  Definir limite de jogadores por equipa automaticamente
    const maxPlayersPerTeam =
      type === "FIVE_A_SIDE" ? 5 : type === "SEVEN_A_SIDE" ? 7 : 11;

    //  Criar novo jogo
    const newGame = await prisma.game.create({
      data: {
        teamA,
        teamB,
        date: new Date(date),
        location,
        type,
        maxPlayersPerTeam,
        createdById: req.user.id,
      },
      include: {
        createdBy: true,
      },
    });

    res.status(201).json(newGame);
  } catch (err) {
    console.error(" Erro ao criar jogo:", err);
    next(err);
  }
});

/* 
    Obter todos os jogos
   */
gameRouter.get("/", async (req, res, next) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(games);
  } catch (err) {
    console.error(" Erro em GET /games:", err.message);
    next(err);
  }
});

/* 
    Obter jogo por ID
   */
gameRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        playersGame: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({ error: "Jogo não encontrado." });
    }

    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
});
/* 
    Atualizar jogo
    */
gameRouter.put("/:id", authGuard, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { teamA, teamB, date, location, state, goalsA, goalsB } = req.body;

    const game = await prisma.game.findUnique({ where: { id } });
    if (!game) return res.status(404).json({ error: "Jogo não encontrado." });

    if (game.createdById !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Não está autorizado a editar este jogo." });
    }

    const updatedGame = await prisma.game.update({
      where: { id },
      data: {
        teamA,
        teamB,
        date: new Date(date),
        location,
        state,
        goalsA,
        goalsB,
      },
    });

    res.status(200).json({
      message: "Jogo atualizado com sucesso",
      game: updatedGame,
    });
  } catch (err) {
    next(err);
  }
});

/* 
    Apagar jogo
  */
gameRouter.delete("/:id", authGuard, async (req, res, next) => {
  try {
    const { id } = req.params;

    const game = await prisma.game.findUnique({ where: { id } });
    if (!game) return res.status(404).json({ error: "Jogo não encontrado." });

    if (game.createdById !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Não está autorizado a apagar este jogo." });
    }

    await prisma.game.delete({ where: { id } });
    res.status(200).json({ message: "Jogo apagado com sucesso." });
  } catch (err) {
    next(err);
  }
});

/* 
   Adicionar jogador ao jogo
 */
gameRouter.post("/:id/players", authGuard, async (req, res, next) => {
  try {
    const { id } = req.params; // ID do jogo
    const { email, name, team = "teamA" } = req.body;

    const game = await prisma.game.findUnique({ where: { id } });
    if (!game) return res.status(404).json({ error: "Jogo não encontrado." });

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstName: name || email.split("@")[0],
          lastName: "",
          password: "temporary",
        },
      });
    }

    const existing = await prisma.playersGame.findFirst({
      where: { userId: user.id, gameId: id },
    });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Jogador já está inscrito neste jogo." });
    }

    const playerGame = await prisma.playersGame.create({
      data: {
        userId: user.id,
        gameId: id,
        team: team === "teamB" ? "teamB" : "teamA",
      },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });

    res.status(201).json({
      message: "Jogador adicionado com sucesso.",
      player: playerGame,
    });
  } catch (err) {
    console.error("Erro em POST /games/:id/players:", err);
    next(err);
  }
});

export default gameRouter;
