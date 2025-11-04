import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { authGuard } from "../utils/auth.js";

const userRouter = Router();

//  Criar novo utilizador
userRouter.post("/", async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const newUser = await prisma.user.create({
      data: { email, firstName, lastName, password },
    });

    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Já existe um utilizador com este email." });
    }
    next(err);
  }
});

//  Estatísticas do utilizador autenticado
userRouter.get("/me/stats", authGuard, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        goals: true,
        victories: true,
        losses: true,
        draws: true,
      },
    });

    res.json(user);
  } catch (err) {
    console.error("Erro em /me/stats:", err);
    next(err);
  }
});

//  Pesquisa rápida por nome ou email (precisa vir ANTES de /:id)
// pesquisa rápida por nome ou email
userRouter.get("/search", authGuard, async (req, res, next) => {
  try {
    const query = req.query.q?.trim() || "";
    if (!query) return res.json([]);

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query } },
          { firstName: { contains: query } },
          { lastName: { contains: query } },
        ],
      },
      select: { id: true, firstName: true, lastName: true, email: true },
      take: 5,
    });

    res.json(users);
  } catch (err) {
    console.error(" Erro em /users/search:", err);
    next(err);
  }
});


//  Obter todos os utilizadores
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//  Obter utilizador por ID (vem DEPOIS das rotas acima)
userRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//  Atualizar utilizador por ID
userRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, password, goals, victories, losses, draws } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, firstName, lastName, password, goals, victories, losses, draws },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

//  Apagar utilizador
userRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.playersGame.deleteMany({ where: { userId: id } });
    await prisma.game.deleteMany({ where: { createdById: id } });
    await prisma.user.delete({ where: { id } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default userRouter;
