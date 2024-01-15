import asyncHandler from "express-async-handler";
import Notify from "../models/notifyModel.js";

const getNotifications = asyncHandler(async (req, res) => {
  const user_id = req.userId;
  const user = await Notify.findOne({ user_id });
  res.status(200).json({
    notifications: user?.notifications.reverse() || [],
  });
});

const removeNotifications = asyncHandler(async (req, res) => {
  const user_id = req.userId;
  const notification = req.body;
  const user = await Notify.findOne({ user_id });
  if (user) {
    user?.notifications.pull(notification);
    await user.save();
    res.status(200).json({
      notifications: user?.notifications.reverse() || [],
    });
  } else {
    res.status(404);
    throw new Error("Something went wrong!");
  }
});

const createNotification = asyncHandler(async (req, res) => {
  const { sender_id, sender_username, content, post_id } = req.body;
  const { user_id } = req.query;
  const notification = {
    content,
    post_id,
    from: {
      id: sender_id,
      username: sender_username,
    },
  };
  const user = await Notify.findOne({ user_id });
  if (user) {
    user.notifications.push(notification);
    user.save();
    res.status(200).json({ success: true });
  } else {
    const newUser = await Notify.create({
      user_id,
      notifications: [notification],
    });
    if (newUser) res.status(200).json({ success: true });
    else {
      res.status(400);
      throw new Error("Something went wrong!");
    }
  }
});

export { createNotification, getNotifications, removeNotifications };
