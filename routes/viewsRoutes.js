import {Router} from "express";
import middleware from "../controllers/middleware.js";
const router = Router();

router.get("/", (req, res) => {
  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de Reservas",
  };
  res.render("home", locals);
});

router.get("/login", (req, res) => {
  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de Login",
  };
  res.render("login", locals);
});

router.get("/cadastro", (req, res) => {
  const locals = {
    title: "Reservas | Grupo O",
    description: "Página de Cadastro",
  };
  res.render("cadastro", {locals, err: null});
});

export default router;
