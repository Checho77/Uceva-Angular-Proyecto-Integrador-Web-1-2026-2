import { Router } from "express";
import { ReservasController } from "./reservas.controller";

export class ReservasRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new ReservasController();

    router.get("/estadisticas", controller.getEstadisticasReservas);

    return router;
  }

}