export function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado. Apenas administradores." });
  }
  next();
}
