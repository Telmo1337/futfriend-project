export default function useGamePermissions(game, user) {
  if (!game || !user) {
    return { isOwner: false };
  }

  const isOwner = game.createdById === user.id;

  return { isOwner };
}
