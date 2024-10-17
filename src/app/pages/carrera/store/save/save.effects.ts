import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as fromActions from './save.actions';
import { CarreraCreateRequest, CarreraResponse } from './save.models';
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

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() =>
        this.httpClient
          .get<CarreraResponse[]>(`${environment.url}api/carreras`)
          .pipe(
            delay(1000),
            map(
              (inmuebles: CarreraResponse[]) =>
                new fromActions.ReadSuccess(inmuebles)
            ),
            catchError((err) => of(new fromActions.ReadError(err.message)))
          )
      )
    )
  );

  // Effect para crear una carrera
  create: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.carrera),
      switchMap((request: CarreraCreateRequest) =>
        this.httpClient
          .post<CarreraResponse>(`${environment.url}api/carreras`, request)
          .pipe(
            delay(1000),
            tap((response: CarreraResponse) => {
              this.router.navigate(['static/welcome']);
            }),
            map(
              (carrera: CarreraResponse) =>
                new fromActions.CreateSuccess(carrera)
            ),
            catchError((err) => {
              this.notification.error(
                `Errores guardando la carrera: ${err.message}`
              );
              return of(new fromActions.CreateError(err.message));
            })
          )
      )
    )
  );
}
