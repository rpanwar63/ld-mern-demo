import express from "express";
import {
  createNotification,
  getNotifications,
  removeNotifications,
} from "../controllers/notifyController.js";
import { protect } from "../middlewares/protectedRoute.js";
const router = express.Router();

router.route("/").post(protect, getNotifications);
router.route("/create").post(createNotification);
router.route("/remove").post(protect, removeNotifications);
export default router;
