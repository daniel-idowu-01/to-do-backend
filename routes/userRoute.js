import expressRouter from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { getTaskByUserId } from "../controllers/taskController.js";
import { getAuth } from "../middleware/auth.js";

const router = expressRouter();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/task", getAuth, getTaskByUserId);

export default router;
