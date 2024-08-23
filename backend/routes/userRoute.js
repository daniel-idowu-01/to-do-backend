import expressRouter from "express";
import { getUserDetails } from "../controllers/userController.js";
import { getAuth } from "../middleware/auth.js";

const router = expressRouter();

router.get('/', getAuth, getUserDetails)

export default router;
