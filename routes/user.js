import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
  getAllUser,
  // restrictAccess,
} from "../controllers/user.js";

import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js";
import { accessController } from "../controllers/Admin.js";
// import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

router.get("/logout", logout);

router.get("/profile", isAuthenticated, getMyProfile);
router.get("/users", isAuthenticated, getAllUser);

router.post("/access/:_id", authorizeRoles("Admin"), accessController);

export default router;
