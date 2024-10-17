import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoEgresadoNuevoComponent } from './movimiento-egresado-nuevo.component';

const routes: Routes = [
  {
    path: '',
    component: MovimientoEgresadoNuevoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoEgresadoNuevoRoutingModule {}
