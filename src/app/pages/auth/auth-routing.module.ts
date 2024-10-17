import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthGuard } from '@app/guards/unauth/unauth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [UnauthGuard],
  },
  {
    path: 'loginEntrada',
    loadChildren: () =>
      import('./pages/Entrada/loginEntrada.module').then(
        (m) => m.LoginEntradaModule
      ),
    canActivate: [UnauthGuard],
  },
  {
    path: 'loginEstudiante',
    loadChildren: () =>
      import('./pages/loginEstudiante/loginEstudiante.module').then(
        (m) => m.LoginEstudianteModule
      ),
    canActivate: [UnauthGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    canActivate: [UnauthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
