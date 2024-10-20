import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { NotificationService } from '@app/services';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from './store';
import * as fromUser from './store/user';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showSpinner = false;
  title = 'client-inmueble-app';
  showSidenav = true; // Nueva variable para controlar el sidenav

  user$!: Observable<fromUser.UserResponse>;
  isAuthorized$!: Observable<boolean>;

  constructor(
    private fs: AngularFirestore,
    private notification: NotificationService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.store.pipe(
      select(fromUser.getUser)
    ) as Observable<fromUser.UserResponse>;
    this.isAuthorized$ = this.store.pipe(
      select(fromUser.getIsAuthorized)
    ) as Observable<boolean>;

    this.store.dispatch(new fromUser.Init());

    // Escuchar eventos de navegación
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ) // Asegúrate de que el tipo sea NavigationEnd
      )
      .subscribe((event) => {
        // Si la ruta es "auth/loginEntrada", "auth/registro" o "dashboard", ocultar el sidenav
        this.showSidenav = !(
          event.url.includes('loginEntrada') ||
          event.url.includes('login') ||
          event.url.includes('loginEstudiante')
        );
      });
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  onFilesChanged(urls: string | string[]): void {
    //console.log(urls);
  }

  onSuccess(): void {
    this.notification.success('El procedimiento fue exitoso');
  }

  onError(): void {
    this.notification.error('Se encontraron errores en el proceso');
  }

  onSignOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.store.dispatch(new fromUser.SignOut());

    this.router.navigate(['/auth/loginEntrada']).then(() => {
      // Añade un retraso antes de ocultar el spinner
      setTimeout(() => {
        this.showSpinner = false; // Oculta el spinner
        this.notification.success('Sesión cerrada con éxito');
      }, 1000); // Ajusta el tiempo según sea necesario (1000 ms = 1 segundo)
    });
  }
}
