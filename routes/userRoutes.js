import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import user from "../models/user.js";

router.post("/login", userController.loginUser);

router.post("/cadastro", userController.createUser);
router.post("/verificaUser", userController.verificaLogado);
router.get("/minhasReservas", userController.viewLerMinhasReservas);
router.post("/minhasReservas", userController.lerMinhasReservas);

export default router;
