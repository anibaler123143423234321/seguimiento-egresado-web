import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () =>
      import(
        './pages/movimiento-egresado-nuevo/movimiento-egresado-nuevo.module'
      ).then((m) => m.MovimientoEgresadoNuevoModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoEgresadoRoutingModule {}
