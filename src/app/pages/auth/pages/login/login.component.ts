import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;

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

    console.log('Dispatching SignInEmail', userLoginRequest);
    this.store.dispatch(new fromUser.SignInEmail(userLoginRequest, false));
  }
}
