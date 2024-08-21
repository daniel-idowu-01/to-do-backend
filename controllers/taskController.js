import { TODO_MOCKDATA } from "../mockData.js";
import { isEmpty } from "../utils/helper.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";

// function to get all tasks (admin)
const getAllTask = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(errorHandler(401, "User is not an admin"));
    }

    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// function to create task
const createTask = async (req, res, next) => {
  const data = req.body;
  const { id } = req.user;
  try {
    await Task.create({
      userId: id,
      ...data,
    });
    res.status(201).json({ success: true, data: "Task created successfully!" });
  } catch (error) {
    next(error);
  }
};

// function to update task
const updateTask = async (req, res, next) => {
  const updatedData = req.body;
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, data: "Id not valid" });
    }
  
    const task = await Task.findByIdAndUpdate(id, updatedData, { new: true });
  
    if (task) {
      res.status(201).json({ success: true, data: task });
    } else {
      res.status(400).json({ success: false, data: "Task not found" });
    }
  } catch (error) {
    next(error)
  }

  
};

// function to delete task
const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      res.status(201).json({ success: true, data: "Task successfully deleted" });
    } else {
      res.status(400).json({ success: false, data: "Task not found" });
    }
    
  } catch (error) {
    next(error)
  }

};

// function to get task by user id
const getTaskByUserId = async (req, res) => {
  const { id } = req.user;

  const task = await Task.findOne({ userId: id });

  if (!task) {
    return res.status(404).json({ success: false, data: "No task found!" });
  }

  res.status(201).json({ success: true, data: task });
};

// function to get task by user id
const getTaskById = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });

  if (!task) {
    return res.status(404).json({ success: false, data: "No task found!" });
  }

  res.status(201).json({ success: true, data: task });
};

export {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskByUserId,
  getTaskById,
};
