import { Carrera } from '@app/models/backend/carrera';
export { Carrera as CarreraResponse } from '@app/models/backend/carrera';

export type CarreraCreateRequest = Omit<Carrera, 'id'>;
