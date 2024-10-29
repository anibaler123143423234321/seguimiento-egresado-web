import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromUser from '@app/store/user';
import { UserResponse } from '@app/store/user';
import { EgresadoResponse } from '@app/pages/egresado/store/save/index';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  usuario$!: UserResponse; // Datos del usuario
  egresado$!: EgresadoResponse; // Datos del egresado

  constructor() {}
}
