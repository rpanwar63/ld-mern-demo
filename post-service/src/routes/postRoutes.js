import express from "express";
import { protect } from "../middlewares/protectedRoute.js";
import {
  getAllPosts,
  getPostById,
  submitPost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, submitPost);
router.route("/:post_id").get(getPostById);

export default router;
