import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "",
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  due_date: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

export default mongoose.model("Task", taskSchema);
