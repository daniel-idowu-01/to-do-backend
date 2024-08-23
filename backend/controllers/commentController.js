import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import { errorHandler } from "../utils/error.js";

const createComment = async (req, res, next) => {
  const { id } = req.user;
  const { taskId } = req.params;
  const { comment } = req.body;

  try {
    const newComment = await Comment.create({
      userId: id,
      taskId,
      comment,
    });

    console.log(newComment)

    res.status(201).json({ success: true, data: "Comment sent!" });
  } catch (error) {
    next(error);
  }
};

const getCommentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return next(errorHandler(404, "Comment not found!"));
    }
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

const getCommentByTaskId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return next(errorHandler(404, "Task not found!"));
    }

    const taskComments = await Comment.find(
      { taskId: id },
      { _id: 1, comment: 1 }
    );

    if (taskComments.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: "No comments for this task" });
    }

    res.status(200).json({ success: true, data: taskComments });
  } catch (error) {
    next(error);
  }
};

const deleteCommentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return next(errorHandler(404, "Comment not found!"));
    }
    res
      .status(200)
      .json({ success: true, data: "Comment successfully deleted!" });
  } catch (error) {
    next(error);
  }
};

export { createComment, getCommentById, getCommentByTaskId, deleteCommentById };
