/* eslint-disable no-unused-vars */
// Serviço de autenticação: valida credenciais, cria utilizadores e tokens JWT.
import { prisma } from '../../db/prisma.js';
import { checkPassword, generateToken, hashPassword } from '../utils/auth.js';

export async function registerUser(data) {
  // Verifica duplicados pelo email antes de criar o utilizador
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    return { error: 'Email já está registado.', status: 400 };
  }

  // Hash da password para armazenamento seguro
  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  const token = generateToken(user);
  
  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}

export async function loginUser({ identifier, password }) {
  // Procura por email ou nickname para permitir ambas as formas de login
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { nickname: identifier }],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      nickname: true,
      password: true,
    },
  });

  if (!user) {
    return { error: 'Email ou password incorreta.', status: 404 };
  }

  // Compara o hash guardado com a password fornecida
  const valid = await checkPassword(password, user.password);
  if (!valid) {
    return { error: 'Email ou password incorreta.', status: 401 };
  }

  // Gera token JWT com dados mínimos do utilizador
  const token = generateToken(user);
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}

export async function verifyUser(userId) {
  // Verifica se o utilizador ainda existe na base de dados
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, firstName: true, lastName: true, email: true, nickname: true },
  });

  if (!user) {
    return { error: 'user not found', status: 404 };
  }

  return { user };
}