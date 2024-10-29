import { Action } from '@ngrx/store';
import { EgresadoCreateRequest, EgresadoResponse } from './save.models';

export enum Types {
  CREATE = '[Egresado] Create: Start',
  CREATE_SUCCESS = '[Egresado] Create: Success',
  CREATE_ERROR = '[Egresado] Create: Error',

  READ = '[Egresado] Read',
  READ_SUCCESS = '[Egresado] Read:Success',
  READ_ERROR = '[Egresado] Read:Error',
}

export class Read implements Action {
  readonly type = Types.READ;
  constructor(
    public pagina: number = 0,
    public elementosPorPagina: number = 5,
    public ordenadorPor: string = 'nombre',
    public enOrden: string = 'ASC'
  ) {}
}

export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;
  constructor(public egresados: EgresadoResponse[]) {}
}

export class ReadError implements Action {
  readonly type = Types.READ_ERROR;
  constructor(public error: string) {}
}

export class Create implements Action {
  readonly type = Types.CREATE;
  constructor(public egresado: EgresadoCreateRequest) {}
}

export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;
  constructor(public egresado: EgresadoResponse) {}
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
