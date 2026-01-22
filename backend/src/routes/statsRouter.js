import { Router } from "express";
import { authGuard } from "../utils/auth.js";

import { rankingController, topScorersController } from "../controllers/statsController.js";
const statsRouter = Router();

// Ranking geral (por vitórias, etc.)
statsRouter.get("/ranking", authGuard, rankingController);

// Top goleadores
statsRouter.get("/top-scorers", authGuard, topScorersController);

export default statsRouter;
