import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import user from "../models/user.js";

router.get("/", (req, res) => {
  res.render("/login");
});

router.post("/cadastro", userController.createUser);

export default router;
