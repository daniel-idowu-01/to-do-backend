import expressRouter from "express";
import { getTaskByUserId } from "../controllers/taskController.js";
import { getAuth } from "../middleware/auth.js";

const router = expressRouter();

router.get("/task", getAuth, getTaskByUserId);

export default router;
