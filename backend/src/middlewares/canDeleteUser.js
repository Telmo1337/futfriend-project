export function canDeleteUser(req, res, next) {
  const authUserId = req.user.id;
  const targetUserId = req.params.id;
  const role = req.user.role;

  if (authUserId === targetUserId) return next(); // o user apaga-se a si mesmo
  if (role === "ADMIN") return next(); // admin apaga qualquer um

  return res.status(403).json({ error: "Não tens permissão para apagar este utilizador." });
}
