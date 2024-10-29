import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromActions from './save.actions';
import Swal from 'sweetalert2';
import {
  MovimientoEgresadoCreateRequest,
  MovimientoEgresadoResponse,
} from './save.models';
import { environment } from 'environments/environment';

type Action = fromActions.All;

@Injectable()
export class SaveEffects {
  constructor(
    private actions: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private notification: NotificationService
  ) {}

  // Effect para crear una carrera
  create: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.movimiento),
      tap((request: MovimientoEgresadoCreateRequest) => {
        console.log('Datos que se están enviando:', request);
      }),
      switchMap((request: MovimientoEgresadoCreateRequest) =>
        this.httpClient
          .post<MovimientoEgresadoResponse>(
            `${environment.url}api/movimientos-egresados`,
            request
          )
          .pipe(
            delay(1000), // Delay opcional
            tap((response: MovimientoEgresadoResponse) => {
              // Aquí se muestra el mensaje de éxito con SweetAlert si la solicitud fue exitosa
              Swal.fire({
                title: 'Registro exitoso',
                text: 'El movimiento del egresado fue registrado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
              this.router.navigate(['static/welcome']);
            }),
            map(
              (egresado: MovimientoEgresadoResponse) =>
                new fromActions.CreateSuccess(egresado)
            ),
            catchError((err) => {
              // SweetAlert muestra un mensaje de error en caso de fallo en la creación
              Swal.fire({
                title: 'Error',
                text: `No se pudo registrar el movimiento del egresado: ${err.message}`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
              return of(new fromActions.CreateError(err.message));
            })
          )
      )
    )
  );

  loadMovimientos: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        this.httpClient
          .get<MovimientoEgresadoResponse[]>(
            `${environment.url}api/movimientos-egresados/movimientos`
          )
          .pipe(
            map(
              (movimientos: MovimientoEgresadoResponse[]) =>
                new fromActions.ReadSuccess(movimientos)
            ),
            catchError((err) => of(new fromActions.ReadError(err.message)))
          )
      )
    )
  );
}
