import { Router } from "express";
import { ExampleRoutes } from "./modules/example/example.routes";
import { EventosRoutes } from "./modules/eventos/eventos.routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();

    // Definir rutas
    apiRouter.use("/example", ExampleRoutes.routes);
    apiRouter.use("/eventos", EventosRoutes.routes);

    router.use("/api", apiRouter);

    return router;
  }
}