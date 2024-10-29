import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { environment } from '@src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import * as fromActions from './user.actions';
import { UserResponse } from './user.models';
import { GeneralService } from '@app/services/general.service';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private httpClient: HttpClient,
    private notification: NotificationService,
    public GeneralService: GeneralService
  ) {}

  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.user),
      switchMap((userData) =>
        this.httpClient
          .post<UserResponse>(
            `${environment.url}api/authentication/sign-up`,
            userData
          )
          .pipe(
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            map(
              (response: UserResponse) =>
                new fromActions.SignUpEmailSuccess(
                  response.email,
                  response || null
                )
            ),
            //catchError(err => of(new fromActions.SignUpEmailError(err.message)))

            catchError((err) => {
              this.notification.error('Errores al registrar nuevo usuario');
              return of(new fromActions.SignUpEmailError(err.message));
            })
          )
      )
    )
  );
  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGIN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => ({
        credentials: action.credentials,
        isEgresado: action.isEgresado,
      })),
      switchMap(({ credentials, isEgresado }) => {
        const endpoint = isEgresado
          ? `${environment.url}api/authentication/sign-in/egresado`
          : `${environment.url}api/authentication/sign-in`;

        //console.log('isEgresado:', isEgresado);
        //console.log('Using endpoint:', endpoint);

        return this.httpClient.post<UserResponse>(endpoint, credentials).pipe(
          tap((response: UserResponse) => {
            //console.log('Server response:', response);
            // Guarda el token y los datos del usuario
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response));
            /*             this.GeneralService.setUsuarioData(response);
             */ this.router.navigate(['/']);
          }),
          map(
            (response: UserResponse) =>
              new fromActions.SignInEmailSuccess(
                response.email,
                response || null
              )
          ),
          catchError((err) => {
            console.error('Error during sign-in:', err);
            this.notification.error('Credenciales incorrectas');
            return of(new fromActions.SignInEmailError(err.message));
          })
        );
      })
    )
  );

  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      tap(() => console.log('INIT action triggered')), // Agrega esto
      switchMap(() => {
        const token = localStorage.getItem('token');

        if (!token) {
          return of(new fromActions.InitUnauthorized());
        }

        // Aquí puedes determinar si el usuario es un egresado
        const user = JSON.parse(localStorage.getItem('user') || '{}'); // Obtén los datos del usuario de localStorage
        const isEgresado = user.role === 'EGRESADO'; // Asegúrate de que el rol esté definido en los datos del usuario

        // Usar el endpoint correspondiente
        const endpoint = isEgresado
          ? `${environment.url}api/egresados`
          : `${environment.url}api/user`;

        return this.httpClient.get<UserResponse>(endpoint).pipe(
          tap((user: UserResponse) => {
            // Guardar el usuario en localStorage
            localStorage.setItem('user', JSON.stringify(user));

            // Asignar el usuario a GeneralService.usuario$
            this.GeneralService.usuario$ = user;
            console.log(
              'data del usuario en sesion que viene del servidor=>',
              this.GeneralService.usuario$
            );
          }),
          map(
            (user: UserResponse) =>
              new fromActions.InitAuthorized(user.email, user || null)
          ),
          catchError((err) => of(new fromActions.InitError(err.message)))
        );
      })
    )
  );
}
