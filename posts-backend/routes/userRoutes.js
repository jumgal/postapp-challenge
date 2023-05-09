import express from "express";
import { signInUser, signUpUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", signUpUser);
router.post('/login', signInUser)

export { router as userRoutes };
