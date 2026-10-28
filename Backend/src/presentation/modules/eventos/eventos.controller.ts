import { Request, Response } from "express";
import { HandleError } from "../../../domain/errors/handle.error";
import { EventosService } from "./eventos.service";

export class EventosController {

  private readonly eventosService = new EventosService();

  getAllEventos = (req: Request, res: Response): void => {
    this.eventosService.getAllEventos()
      .then((eventos) => res.status(200).json(eventos))
      .catch((error) => HandleError.error(error, res));
  };

}