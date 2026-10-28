
export interface EventoApi {
  id_evento: number;
  titulo: string;
  descripcion: string | null;
  fecha_evento: string;
  lugar: string;
  precio: number;
  imagen_url: string | null;
  estado: string;
  categoria: string;
  descripcion_categoria: string | null;
}

export interface EstadisticaReservaApi {
  id_evento: number;
  nombre_evento: string;
  total_reservas: number;
  reservas_no_canceladas: number;
  personas_confirmadas: number;
  ingresos_confirmados: number;
}
