import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
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

const Post = mongoose.model("Post", PostSchema);
export default Post;
