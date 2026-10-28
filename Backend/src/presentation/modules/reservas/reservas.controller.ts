import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { ReservasService } from "./reservas.service";

export class ReservasController {

  private readonly reservasService = new ReservasService();

  getEstadisticasReservas = (req: Request, res: Response): void => {
    this.reservasService.getEstadisticasReservas()
      .then((estadisticas) => res.status(200).json(estadisticas))
      .catch((error) => HandleError.error(error, res));
  };

}