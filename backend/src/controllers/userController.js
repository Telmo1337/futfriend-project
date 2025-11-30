// Controladores dedicados a operações sobre utilizadores (CRUD, estatísticas, pesquisa)
// que delegam a lógica de negócio para os serviços.
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserStats,
  searchUsers,
  updateUserById,
} from '../services/userService.js';

export async function createUserController(req, res, next) {
  try {
    const { email, firstName, lastName, password } = req.validated.body;
    // Criação de utilizador com validação prévia feita pelo validateRequest
    const newUser = await createUser({ email, firstName, lastName, password });
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Já existe um utilizador com este email.' });
    }
    next(err);
  }
}

export async function userStatsController(req, res, next) {
  try {
    // Estatísticas do utilizador autenticado (jogos, golos, etc.)
    const user = await getUserStats(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function searchUsersController(req, res, next) {
  try {
    // Pesquisa por nome ou email através do query param ?q=
    const query = req.query.q?.trim() || '';
    const users = await searchUsers(query);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUsersController(req, res, next) {
  try {
    // Listagem simples de utilizadores para interfaces administrativas
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserByIdController(req, res, next) {
  try {
    const { id } = req.validated.params;
    // Inclui os jogos associados no objeto devolvido pelo serviço
    const user = await getUserById(id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function updateUserController(req, res, next) {
  try {
    const { id } = req.validated.params;
    // Permite atualização parcial dos campos de perfil
    const updatedUser = await updateUserById(id, req.validated.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserController(req, res, next) {
  try {
    const { id } = req.validated.params;
    // Remove o utilizador e respetivas referências relacionais
    await deleteUserById(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}