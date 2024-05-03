import {Router} from "express";
import userController from "../controllers/user.controller.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});
router.post("/login", userController.loginUser);

router.get("/cadastro", (req, res) => {
  res.render("cadastro", {err: null});
});

router.get("/home", (req, res) => {
  res.render("home");
});

export default router;
