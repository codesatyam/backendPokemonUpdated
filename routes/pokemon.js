import express from "express";
import {
  deletePokemon,
  getMyPokemon,
  newPokemon,
  feedPokemon,
} from "../controllers/pokemon.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newPokemon);

router.get("/my", isAuthenticated, getMyPokemon);

router
  .route("/:id")
  .put(isAuthenticated, feedPokemon)
  .delete(isAuthenticated, deletePokemon);

export default router;
