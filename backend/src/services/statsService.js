import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getRanking(orderBy = "victories", limit = 20) {
  const allowedFields = ["victories", "goals", "draws", "losses"];
  if (!allowedFields.includes(orderBy)) {
    throw new Error("Campo de ordenação inválido");
  }

  return prisma.user.findMany({
    select: {
      id: true,
      nickname: true,
      goals: true,
      victories: true,
      draws: true,
      losses: true,
    },
    orderBy: {
      [orderBy]: "desc",
    },
    take: limit,
  });
}

export async function getTopScorers(limit = 20) {
  return prisma.user.findMany({
    select: {
      id: true,
      nickname: true,
      goals: true,
    },
    orderBy: {
      goals: "desc",
    },
    take: limit,
  });
}
