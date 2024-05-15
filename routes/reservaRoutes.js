import {Router} from "express";
import reservaController from "../controllers/reservaController.js";

const router = Router();

router.get("/reservaEspaco/:id", reservaController.viewReservaEspaco);

router.post(
  "/buscaReservasPorEspaco",
  reservaController.buscaReservasPorEspaco
);

router.post("/buscaReservaPorDia", reservaController.buscaReservaPorDia);

export default router;
