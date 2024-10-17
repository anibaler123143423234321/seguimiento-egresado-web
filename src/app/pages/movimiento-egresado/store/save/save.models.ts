import { MovimientoEgresado } from '@app/models/backend/movimiento';
export { MovimientoEgresado as MovimientoEgresadoResponse } from '@app/models/backend/movimiento';

export type MovimientoEgresadoCreateRequest = Omit<MovimientoEgresado, 'id'>;
