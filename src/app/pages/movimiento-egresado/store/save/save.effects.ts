import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromActions from './save.actions';
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
        // Agrega un console.log para ver los datos del request
        console.log('Datos que se están enviando:', request);
      }),
      switchMap((request: MovimientoEgresadoCreateRequest) =>
        this.httpClient
          .post<MovimientoEgresadoResponse>(
            `${environment.url}api/movimientos-egresados`,
            request
          )
          .pipe(
            delay(1000),
            tap((response: MovimientoEgresadoResponse) => {
              this.router.navigate(['static/welcome']);
            }),
            map(
              (egresado: MovimientoEgresadoResponse) =>
                new fromActions.CreateSuccess(egresado)
            ),
            catchError((err) => {
              this.notification.error(
                `Errores guardando al egresado: ${err.message}`
              );
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
                new fromActions.ReadSuccess(movimientos) // Cambié a ReadSuccess
            ),
            catchError((err) => of(new fromActions.ReadError(err.message)))
          )
      )
    )
  );
}
