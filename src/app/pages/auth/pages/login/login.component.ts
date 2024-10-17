import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Store } from '@ngrx/store';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading$!: Observable<boolean | null>;
  showPassword = false; // Inicializa como true para mostrar la contraseña por defecto

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {}
  loginUsuario(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const userLoginRequest: fromUser.EmailPasswordCredentials = {
      email: form.value.email || '',
      password: form.value.password || '',
    };

    console.log('Dispatching SignInEmail', userLoginRequest); // Verificar si llega hasta aquí

    this.store.dispatch(new fromUser.SignInEmail(userLoginRequest));
  }
}
