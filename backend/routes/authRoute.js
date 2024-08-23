import expressRouter from "express";
import { createUser, loginUser } from "../controllers/authController.js";

const router = expressRouter();

router.post("/", createUser);
router.post("/login", loginUser);

export default router;
