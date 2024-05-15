import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import user from "../models/user.js";

router.post("/login", userController.loginUser);

router.post("/cadastro", userController.createUser);

export default router;
