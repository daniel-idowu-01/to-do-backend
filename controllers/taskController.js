import { TODO_MOCKDATA } from "../mockData.js";
import { isEmpty } from "../utils/helper.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";
import { errorHandler } from "../utils/error.js";

// function to get tasks
const getAllTask = async (req, res, next) => {
  console.log(req.user)
  try {
    if (req.user.role !== 'admin') {
      return next(errorHandler(401, "User is not an admin"));
    }

    const tasks = await Task.find({});
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// function to create task
const createTask = async (req, res) => {
  const data = req.body;
  const { id } = req.user;
  try {
    const newTask = await Task.create({
      userId: id,
      ...data,
    });
    res.status(201).json({ success: true, data: "Task created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, data: "Cannot create task" });
  }
};

// function to update task
const updateTask = async (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, data: "Id not valid" });
  }

  const task = await Task.findByIdAndUpdate(id, updatedData);

  if (task) {
    res.status(201).json({ success: true, data: task });
  } else {
    res.status(400).json({ success: false, data: "Task not found" });
  }
};

// function to delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  const deletedTask = await Task.findByIdAndDelete(id);
  if (deletedTask) {
    res.status(201).json({ success: true, data: deletedTask });
  } else {
    res.status(400).json({ success: false, data: "Task not found" });
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

export { getAllTask, createTask, updateTask, deleteTask, getTaskByUserId };
