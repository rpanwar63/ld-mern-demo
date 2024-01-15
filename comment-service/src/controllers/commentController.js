import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
import { CommentNotification } from "./eventController.js";

const getComments = asyncHandler(async (req, res) => {
  const { post_id, page = 1, limit = 5 } = req.query;
  const comments = await Comment.find({ post_id }).sort({ date: -1 });
  const count = await Comment.countDocuments();
  if (comments) {
    res.status(200).json({
      comments,
      pagination: {
        totalCount: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});

const submitComment = asyncHandler(async (req, res) => {
  const { content, user_id, post_author_id } = req.body;
  const { post_id } = req.query;
  const username = req.username;
  const comment = await Comment.create({
    post_id,
    content,
    author: { id: user_id, username },
  });
  if (comment) {
    CommentNotification.emit("notify", {
      sender_id: user_id,
      sender_username: username,
      content: `${username} commented on your post`,
      post_id,
      user_id: post_author_id,
    });
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});

export { getComments, submitComment };
