import { Router } from "express";
import { ExampleRoutes } from "./modules/example/example.routes";
import { EventosRoutes } from "./modules/eventos/eventos.routes";
import { ReservasRoutes } from "./modules/reservas/reservas.routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();

    // Definir rutas
    apiRouter.use("/example", ExampleRoutes.routes);
    apiRouter.use("/eventos", EventosRoutes.routes);
    apiRouter.use("/reservas", ReservasRoutes.routes);

    router.use("/api", apiRouter);

    return router;
  }
}