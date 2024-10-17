import { Egresado } from '@app/models/backend/egresado';
export { Egresado as EgresadoResponse } from '@app/models/backend/egresado';

export type EgresadoCreateRequest = Omit<Egresado, 'id'>;
