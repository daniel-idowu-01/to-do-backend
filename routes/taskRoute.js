import expressRouter from "express";
import {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import {getAuth} from "../middleware/auth.js";

const router = expressRouter();

router.get("/", getAuth, getAllTask);

router.post("/", getAuth, createTask);

router.put("/update/:id", updateTask);

router.delete("/delete/:id", deleteTask);

export default router;
