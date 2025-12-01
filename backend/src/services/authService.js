/* eslint-disable no-unused-vars */
import { prisma } from '../../db/prisma.js';
import { checkPassword, generateToken, hashPassword } from '../utils/auth.js';

export async function registerUser(data) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return { error: 'Email já está registado.', status: 400 };
  }

  // Hash
  const hashedPassword = await hashPassword(data.password);

  // Verificar se este é o primeiro utilizador
  const countUsers = await prisma.user.count();

  const user = await prisma.user.create({
    data: {
      email: data.email,
      nickname: data.nickname,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword,
      role: countUsers === 0 ? 'ADMIN' : 'USER', // ✔ PRIMEIRO = ADMIN
    },
  });

  const token = generateToken(user);

  // Remover password da resposta
  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}

export async function loginUser({ identifier, password }) {
  // Buscar password também
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { nickname: identifier }],
    },
  });

  if (!user) {
    return { error: 'Email ou password incorreta.', status: 404 };
  }

  // Verificar password
  const valid = await checkPassword(password, user.password);
  if (!valid) {
    return { error: 'Email ou password incorreta.', status: 401 };
  }

  const token = generateToken(user);

  // Remover password
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}

export async function verifyUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      nickname: true,
      role: true,
    },
  });

  if (!user) {
    return { error: 'user not found', status: 404 };
  }

  return { user };
}
