import express from "express";
import espacoController from "../controllers/espacoController.js";
import ejs from "ejs";
import * as path from "path";
import {fileURLToPath} from "url";
import {dirname, join} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

router.get("/addEspaco", (req, res) => {
  res.render("addEspaco");
});

router.post("/addEspaco", espacoController.addEspaco);

router.get("/lerEspacos", espacoController.lerEspacos);
router.post("/lerEspaco", espacoController.lerEspaco);

router.get("/editEspaco/:id", (req, res) => {
  try {
    const {id} = req.params;
    return res.render("editEspaco", {id: id});
  } catch (ex) {
    console.log("err", ex);
  }
});
router.post("/editEspaco", espacoController.editEspaco);
router.get("/deletEspaco/:id", (req, res) => {
  try {
    const {id} = req.params;
    return res.render("deletEspaco", {id: id});
  } catch (ex) {
    console.log("err", ex);
  }
});
router.post("/deletEspaco", espacoController.deletEspaco);

router.get("/reservaEspaco/:id", (req, res) => {
  const {id} = req.params;
  return res.render("reservaEspaco", {id: id});
});
router;
export default router;
