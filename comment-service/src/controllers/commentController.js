import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
import { CommentNotification } from "./eventController.js";

const getComments = asyncHandler(async (req, res) => {
  const { post_id, page = 1, limit = 5 } = req.query;
  const post = await Comment.findOne({ post_id });
  const count = await Comment.countDocuments();
  if (post) {
    res.status(200).json({
      comments: post.comments.reverse() || [],
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
  let commentSubmitted = false;
  const commentPayload = {
    content,
    author: { id: user_id, username },
  };
  const notifyPayload = {
    sender_id: user_id,
    sender_username: username,
    content: `${username} commented on your post`,
    post_id,
    user_id: post_author_id,
  };
  const post = await Comment.findOne({ post_id });
  if (post) {
    post.comments.push(commentPayload);
    await post.save();
    commentSubmitted = true;
  } else {
    const comment = await Comment.create({
      post_id,
      comments: [commentPayload],
    });
    if (comment) commentSubmitted = true;
  }
  if (commentSubmitted) {
    if (user_id !== post_author_id)
      CommentNotification.emit("notify", notifyPayload);
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});

export { getComments, submitComment };
