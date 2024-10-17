import { Action } from '@ngrx/store';
import {
  MovimientoEgresadoCreateRequest,
  MovimientoEgresadoResponse,
} from './save.models';

export enum Types {
  CREATE = '[Movimiento] Create: Start',
  CREATE_SUCCESS = '[Movimiento] Create: Success',
  CREATE_ERROR = '[Movimiento] Create: Error',

  READ = '[Movimiento] Read',
  READ_SUCCESS = '[Movimiento] Read:Success',
  READ_ERROR = '[Movimiento] Read:Error',
}

export class Read implements Action {
  readonly type = Types.READ;
  constructor() {}
}

export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;
  constructor(public movimientos: MovimientoEgresadoResponse[]) {}
}

export class ReadError implements Action {
  readonly type = Types.READ_ERROR;
  constructor(public error: string) {}
}

export class Create implements Action {
  readonly type = Types.CREATE;
  constructor(public movimiento: MovimientoEgresadoCreateRequest) {}
}

export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;
  constructor(public movimientos: MovimientoEgresadoResponse) {}
}

export class CreateError implements Action {
  readonly type = Types.CREATE_ERROR;
  constructor(public error: string) {}
}

export type All =
  | Read
  | ReadSuccess
  | ReadError
  | Create
  | CreateSuccess
  | CreateError;
