export function canUpdateUser(req, res, next) {
  const authUserId = req.user.id;
  const targetUserId = req.params.id;
  const role = req.user.role;

  if (authUserId === targetUserId) return next(); 
  if (role === "ADMIN") return next(); 

  return res.status(403).json({ error: "Não tens permissão para editar este perfil." });
}
