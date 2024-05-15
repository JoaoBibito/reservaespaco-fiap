import express from "express";
import espacoController from "../controllers/espacoController.js";
const router = express.Router();

router.get("/addEspaco", espacoController.viewAddEspaco);
router.post("/addEspaco", espacoController.addEspaco);

router.get("/lerEspacos", espacoController.lerEspacos);
router.post("/lerEspaco", espacoController.lerEspaco);

router.get("/editEspaco/:id", espacoController.viewEditEspaco);
router.post("/editEspaco", espacoController.editEspaco);

router.get("/deletEspaco/:id", espacoController.viewDeletEspaco);
router.post("/deletEspaco", espacoController.deletEspaco);

router;
export default router;
