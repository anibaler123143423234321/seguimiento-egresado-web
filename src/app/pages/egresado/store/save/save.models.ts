import { Egresado } from '@app/models/backend/egresado';
export { Egresado as EgresadoResponse } from '@app/models/backend/egresado';

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export interface EgresadoRequest extends Egresado {
  password: string;
}

export type EgresadoCreateRequest = Omit<Egresado, 'token' | 'id'>;
