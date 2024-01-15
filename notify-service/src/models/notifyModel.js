import mongoose from "mongoose";

const notifySchema = mongoose.Schema({
  user_id: { type: String, required: true },
  notifications: [
    {
      content: {
        type: String,
        required: true,
      },
      post_id: {
        type: String,
      },
      from: {
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
    },
  ],
});

const Notify = mongoose.model("Notify", notifySchema);
export default Notify;
