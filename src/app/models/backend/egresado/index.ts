import { Carrera } from '../carrera';

export interface Egresado {
  id: number;
  dni: string;
  apellidos: string;
  nombre: string;
  sexo: string; // Usamos string ya que en tu entidad Java se define como char
  fechaNacimiento: string; // Usamos string para manejar fechas fácilmente
  idCarrera: number;
  anioEgreso?: string;
  telefono1?: string;
  telefono2?: string;
  titulado: boolean;
  discapacidad: boolean;
  carrera?: Carrera; // Esto depende de si quieres incluir los datos de la carrera anidados
}
