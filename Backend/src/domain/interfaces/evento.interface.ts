export interface Evento {
  id_evento: number;
  titulo: string;
  descripcion: string | null;
  fecha_evento: Date;
  lugar: string;
  precio: number;
  imagen_url: string | null;
  estado: string;
  categoria: string;
  descripcion_categoria: string | null;
}