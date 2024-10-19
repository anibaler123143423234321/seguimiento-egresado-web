import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromActions from './save.actions';
import { EgresadoCreateRequest, EgresadoResponse } from './save.models';
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

  // Efecto para crear un egresado
  create: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.egresado),
      tap((request: EgresadoCreateRequest) => {
        // Agrega un console.log para ver los datos del request
        console.log('Datos que se están enviando:', request);
      }),
      switchMap((request: EgresadoCreateRequest) =>
        this.httpClient
          .post<EgresadoResponse>(`${environment.url}api/egresados`, request)
          .pipe(
            delay(1000),
            tap((response: EgresadoResponse) => {
              this.router.navigate(['static/welcome']);
            }),
            map(
              (egresado: EgresadoResponse) =>
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

  // Efecto para obtener todos los egresados
  getAll: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        this.httpClient
          .get<EgresadoResponse[]>(`${environment.url}api/egresados/all`)
          .pipe(
            map((egresados) => new fromActions.ReadSuccess(egresados)), // Cambiado a ReadSuccess
            catchError((err) => {
              this.notification.error(
                `Error obteniendo egresados: ${err.message}`
              );
              return of(new fromActions.ReadError(err.message));
            })
          )
      )
    )
  );
}
