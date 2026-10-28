import { Router } from "express";
import { EventosController } from "./eventos.controller";

export class EventosRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new EventosController();

    router.get("/", controller.getAllEventos);

    return router;
  }

}