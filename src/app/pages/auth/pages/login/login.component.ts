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
  eyeIsClosed = false;
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

    //console.log('Dispatching SignInEmail', userLoginRequest);
    this.store.dispatch(new fromUser.SignInEmail(userLoginRequest));
  }

  // Para controlar el movimiento del ojo
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.eyeIsClosed = !this.eyeIsClosed; // Alterna entre cerrado y abierto el ojo
  }

  followCursor(event: MouseEvent) {
    const eye = document.querySelector('.eye');
    const rect = (event.target as Element).getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const maxOffset = 5; // Limitar el movimiento del ojo
    const offsetX = Math.min(Math.max(x, -maxOffset), maxOffset);
    const offsetY = Math.min(Math.max(y, -maxOffset), maxOffset);

    if (eye && !this.eyeIsClosed) {
      eye.setAttribute('cx', `${10.5 + offsetX}`);
      eye.setAttribute('cy', `${10.5 + offsetY}`);
    }
  }

  resetEyePosition() {
    const eye = document.querySelector('.eye');
    if (eye) {
      // Vuelve la pupila al centro (posición original)
      eye.setAttribute('cx', '10.5');
      eye.setAttribute('cy', '10.5');
    }
  }
}
