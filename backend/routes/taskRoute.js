import expressRouter from "express";
import {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTaskByUserId,
} from "../controllers/taskController.js";
import { getAuth } from "../middleware/auth.js";

const router = expressRouter();

router.get("/", getAuth, getAllTask);

router.get("/:id", getAuth, getTaskById);

router.get("/user/:id", getAuth, getTaskByUserId);

router.post("/", getAuth, createTask);

router.put("/update/:id", getAuth, updateTask);

router.delete("/delete/:id", getAuth, deleteTask);

export default router;
