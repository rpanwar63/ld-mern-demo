import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
const getPostById = asyncHandler(async (req, res) => {
  const { post_id } = req.params;
  const post = await Post.findOne({ _id: post_id });
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error("Post not found!");
  }
});
const getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const posts = await Post.find().sort({ date: -1 });
  const count = await Post.countDocuments();
  if (posts) {
    res.status(200).json({
      posts,
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

const submitPost = asyncHandler(async (req, res) => {
  const { content, userId } = req.body;
  const username = req.username;
  const post = await Post.create({
    content,
    author: { id: userId, username },
  });
  if (post) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});

export { getAllPosts, getPostById, submitPost };
