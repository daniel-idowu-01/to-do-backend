import expressRouter from "express";
import { createUser, loginUser, forgotPassword } from "../controllers/authController.js";

const router = expressRouter();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/forgot-password", forgotPassword);

export default router;
