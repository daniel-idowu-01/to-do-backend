import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Comment', commentSchema)