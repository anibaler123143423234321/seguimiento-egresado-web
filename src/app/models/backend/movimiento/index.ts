import { Egresado } from '../egresado';

export interface MovimientoEgresado {
  id: number;
  egresado: { id: number }; // Añadir esto para soportar el ID del egresado
  empresa: string;
  cargo: string;
  fechaInicio: string; // Usamos string para manejar fechas fácilmente
  fechaFin?: string; // Es opcional, por lo que usamos el operador "?"
  observaciones?: string; // También es opcional
}
