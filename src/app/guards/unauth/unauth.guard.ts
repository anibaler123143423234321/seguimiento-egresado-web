import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { filter, map, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

  private check(): Observable<boolean> {
    return this.store.pipe(select(fromUser.getUserState)).pipe(
      filter(state => !state.loading), // Asegúrate de que no está cargando el estado
      tap(state => {
        // Si el usuario está autenticado, redirige a la ruta principal
        if (state.email) {
          this.router.navigate(['/']); // Cambia a '/welcome' si es necesario
        }
      }),
      map(state => !state.email) // Devuelve true si no hay email (no autenticado)
    );
  }
}
