import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    due_date: {
      type: String,
      /* required: true, */
    },
    priority: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
