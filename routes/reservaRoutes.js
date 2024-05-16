import {Router} from "express";
import middleware from "../controllers/middleware.js";
import reservaController from "../controllers/reservaController.js";

const router = Router();

router.get(
  "/reservaEspaco/:id",
  middleware.isLogged,
  reservaController.viewReservaEspaco
);
router.post(
  "/reservaEspaco",
  middleware.isLogged,
  reservaController.reservaEspaco
);

router.post(
  "/buscaReservasPorEspaco",
  middleware.isLogged,
  reservaController.buscaReservasPorEspaco
);

router.post(
  "/buscaReservaPorDia",
  middleware.isLogged,
  reservaController.buscaReservaPorDia
);

export default router;
