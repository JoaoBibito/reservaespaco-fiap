import {Router} from "express";
import reservaController from "../controllers/reservaController.js";

const router = Router();

router.get("/reservaEspaco/:id", (req, res) => {
  const {id} = req.params;
  return res.render("reservaEspaco", {id: id});
});

router.post(
  "/buscaReservasPorEspaco",
  reservaController.buscaReservasPorEspaco
);

export default router;
