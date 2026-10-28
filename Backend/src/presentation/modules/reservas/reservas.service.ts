import { pool } from "../../../config/database";
import { EstadisticaReserva } from "../../../domain/interfaces/reserva.interface";

export class ReservasService {

  public async getEstadisticasReservas(): Promise<EstadisticaReserva[]> {
    const sql = `
      SELECT
        e.id_evento,
        e.titulo AS nombre_evento,
        COUNT(r.id_reserva)::int AS total_reservas,
        COUNT(r.id_reserva) FILTER (
          WHERE r.estado_reserva <> 'cancelada'
        )::int AS reservas_no_canceladas,
        COALESCE(
          SUM(r.cantidad_personas) FILTER (
            WHERE r.estado_reserva = 'confirmada'
          ), 0
        )::int AS personas_confirmadas,
        COALESCE(
          SUM(r.cantidad_personas * e.precio) FILTER (
            WHERE r.estado_reserva = 'confirmada'
          ), 0
        )::numeric(12,2) AS ingresos_confirmados
      FROM evento e
      LEFT JOIN reserva_evento r
        ON r.id_evento = e.id_evento
      GROUP BY e.id_evento, e.titulo
      ORDER BY total_reservas DESC, e.id_evento;
    `;

    const result = await pool.query<EstadisticaReserva>(sql);

    // pg devuelve NUMERIC como texto, por eso ingresos_confirmados se convierte a número
    return result.rows.map((reserva) => ({
      ...reserva,
      total_reservas: Number(reserva.total_reservas),
      reservas_no_canceladas: Number(reserva.reservas_no_canceladas),
      personas_confirmadas: Number(reserva.personas_confirmadas),
      ingresos_confirmados: Number(reserva.ingresos_confirmados)
    }));
  }

}