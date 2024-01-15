import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  post_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
