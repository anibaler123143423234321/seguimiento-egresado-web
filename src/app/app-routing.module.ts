import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'static',
        loadChildren: () =>
          import('./pages/static/static.module').then((m) => m.StaticModule),
      },
      {
        path: 'carrera',
        loadChildren: () =>
          import('./pages/carrera/carrera.module').then((m) => m.CarreraModule),
      },
      {
        path: 'movimiento-egresado',
        loadChildren: () =>
          import('./pages/movimiento-egresado/movimiento-egresado.module').then(
            (m) => m.MovimientoEgresadoModule
          ),
      },
      {
        path: 'egresado',
        loadChildren: () =>
          import('./pages/egresado/egresado.module').then(
            (m) => m.EgresadoModule
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'static/welcome',
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'static/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
