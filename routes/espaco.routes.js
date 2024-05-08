import express from "express";
import espacoController from "../controllers/espaco.controller.js";
const router = express.Router();

router.get("/addEspaco", (req, res) => {
  res.render("addEspaco");
});

router.post("/addEspaco", espacoController.addEspaco);

router.get("/lerEspacos", espacoController.lerEspacos);

router.get("/editEspaco?:id", (req, res) => {
  const {id} = req.body;
  res.render("editEspaco", {id: id});
});
//router.post("/editEspaco", espacoController.editEspaco);

export default router;
