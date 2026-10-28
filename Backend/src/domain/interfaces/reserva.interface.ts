export interface EstadisticaReserva {
  id_evento: number;
  nombre_evento: string;
  total_reservas: number;
  reservas_no_canceladas: number;
  personas_confirmadas: number;
  ingresos_confirmados: number;
}