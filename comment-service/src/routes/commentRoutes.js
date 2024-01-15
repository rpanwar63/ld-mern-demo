import express from "express";
import { protect } from "../middlewares/protectedRoute.js";
import {
  getComments,
  submitComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.route("/").get(getComments).post(protect, submitComment);

export default router;
