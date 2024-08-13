import { TODO_MOCKDATA } from "../mockData.js";
import { isEmpty } from "../utils/helper.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";

// function to get tasks
const getAllTask = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ success: true, data: tasks });
};

// function to create task
const createTask = async (req, res) => {
  const data = req.body;
  try {
    const newTask = await Task.create(data);
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
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

  const deletedTask = await Task.findByIdAndDelete(id)
  if (deletedTask) {
    res.status(201).json({ success: true, data: deletedTask });
  } else {
    res.status(400).json({ success: false, data: "Task not found" });
  }
};

export { getAllTask, createTask, updateTask, deleteTask };
