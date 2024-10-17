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
  animations: [
    trigger('flyIn', [
      transition(':enter', [
        animate(
          '1s ease-in-out',
          keyframes([
            style({ transform: 'translateX(80%)', opacity: 2, offset: 0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loading$!: Observable<boolean | null>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {}

  loginUsuario(form: NgForm): void {
    if (!form.valid) {
      // Si el formulario no es válido (los campos están vacíos o incompletos), no enviar
      return;
    }

    const userLoginRequest: fromUser.EmailPasswordCredentials = {
      email: form.value.email || '', // Evitar valor null o undefined
      password: form.value.password || '', // Evitar valor null o undefined
    };

    this.store.dispatch(new fromUser.SignInEmail(userLoginRequest));
  }
}
