import {
  getRanking,
  getTopScorers,
} from "../services/statsService.js";

export async function rankingController(req, res, next) {
  try {
    const orderBy = req.query.by || "victories";
    const users = await getRanking(orderBy);
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function topScorersController(req, res, next) {
  try {
    const users = await getTopScorers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}
