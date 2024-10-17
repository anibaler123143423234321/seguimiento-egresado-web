import { Egresado } from '../egresado';

export interface MovimientoEgresado {
  id: number;
  egresado?: Egresado;
  empresa: string;
  cargo: string;
  fechaInicio: string; // Usamos string para manejar fechas fácilmente
  fechaFin?: string; // Es opcional, por lo que usamos el operador "?"
  observaciones?: string; // También es opcional
}
