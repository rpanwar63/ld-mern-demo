import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/").post(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
