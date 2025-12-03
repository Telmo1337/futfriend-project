// Serviço que centraliza operações e regras de negócio relativas a utilizadores.
import { prisma } from '../../db/prisma.js';

export async function createUser(data) {
  // Cria utilizador com os dados já validados
  return prisma.user.create({ data });
}

export async function getUserStats(userId) {
  // Recolhe estatísticas básicas usadas no dashboard do utilizador
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      goals: true,
      victories: true,
      losses: true,
      draws: true,
    },
  });
}

export async function searchUsers(query) {
  // Pesquisa simples por nome ou email, limitada a 5 resultados
  if (!query) return [];

  return prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: query } },
        { firstName: { contains: query } },
        { lastName: { contains: query } },
        { nickname: { contains: query } }   // FALTAVA ISTO
      ]
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      nickname: true,
      email: true,
    },
    take: 5,
  });
}

export async function getAllUsers(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  // total de utilizadores
  const total = await prisma.user.count();

  // obter utilizadores paginados
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      nickname: true,
      firstName: true,
      lastName: true,
      goals: true,
      victories: true,
      losses: true,
      draws: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    users
  };
}

export async function getUserById(id) {
  // Retorna perfil completo pelo id
  return prisma.user.findUnique({ where: { id } });
}

export async function updateUserById(id, data) {
  // Atualiza campos permitidos de perfil
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUserById(id) {
  // Limpa relações antes de remover o utilizador
  await prisma.playersGame.deleteMany({ where: { userId: id } });
  await prisma.game.deleteMany({ where: { createdById: id } });
  return prisma.user.delete({ where: { id } });
}