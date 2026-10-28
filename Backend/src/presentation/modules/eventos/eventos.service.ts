import { pool } from "../../../config/database";
import { Evento } from "../../../domain/interfaces/evento.interface";

export class EventosService {

  public async getAllEventos(): Promise<Evento[]> {
    const sql = `
      SELECT
        e.id_evento,
        e.titulo,
        e.descripcion,
        e.fecha_evento,
        e.lugar,
        e.precio,
        e.imagen_url,
        e.estado,
        c.nombre_categoria AS categoria,
        c.descripcion AS descripcion_categoria
      FROM evento e
      INNER JOIN categoria_evento c
        ON e.id_categoria = c.id_categoria
      ORDER BY e.fecha_evento;
    `;

    const result = await pool.query<Evento>(sql);

    return result.rows.map((evento) => ({
      ...evento,
      precio: Number(evento.precio)
    }));
  }

}