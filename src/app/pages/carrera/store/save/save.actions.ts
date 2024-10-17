import { Action } from '@ngrx/store';
import { CarreraCreateRequest, CarreraResponse } from './save.models';

export enum Types {
  CREATE = '[Carrera] Create: Start',
  CREATE_SUCCESS = '[Carrera] Create: Success',
  CREATE_ERROR = '[Carrera] Create: Error',

  READ = '[Carrera] Read',
  READ_SUCCESS = '[Carrera] Read:Success',
  READ_ERROR = '[Carrera] Read:Error',
}

export class Read implements Action {
  readonly type = Types.READ;
  constructor() {}
}

export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;
  constructor(public carreras: CarreraResponse[]) {}
}

export class ReadError implements Action {
  readonly type = Types.READ_ERROR;
  constructor(public error: string) {}
}

export class Create implements Action {
  readonly type = Types.CREATE;
  constructor(public carrera: CarreraCreateRequest) {}
}

export class CreateSuccess implements Action {
  readonly type = Types.CREATE_SUCCESS;
  constructor(public carrera: CarreraResponse) {}
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
