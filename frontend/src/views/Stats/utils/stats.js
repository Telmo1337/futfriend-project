export function calcWinRate({ victories, draws, losses }) {
  const games = victories + draws + losses;
  if (games === 0) return 0;
  return Math.round((victories / games) * 100);
}
