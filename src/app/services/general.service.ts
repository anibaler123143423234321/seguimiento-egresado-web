import { Injectable } from '@angular/core';
import { UserResponse } from '@app/store/user';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  usuario$!: UserResponse;

  constructor() {}

  setUsuarioData(user: UserResponse) {
    this.usuario$ = user;
    console.log(
      'Datos del usuario guardados en GeneralService:',
      this.usuario$
    );
  }
}
