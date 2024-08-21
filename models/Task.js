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
      default: false
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
