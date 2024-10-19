import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-login-egresado',
  templateUrl: './loginEstudiante.component.html',
  styleUrls: ['./loginEstudiante.component.scss'],
})
export class LoginEgresadoComponent implements OnInit {
  showPassword = false;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {}

  loginEgresado(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const egresadoLoginRequest: fromUser.EmailPasswordCredentials = {
      email: form.value.email || '',
      password: form.value.password || '',
    };

    console.log('Dispatching SignInEmailEgresado', egresadoLoginRequest);
    this.store.dispatch(new fromUser.SignInEmail(egresadoLoginRequest, true));
  }
}
