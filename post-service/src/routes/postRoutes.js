import express from "express";
import { protect } from "../middlewares/protectedRoute.js";
import { getAllPosts, submitPost } from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, submitPost);

export default router;
