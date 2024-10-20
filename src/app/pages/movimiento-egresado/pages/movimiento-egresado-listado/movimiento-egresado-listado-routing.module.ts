import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoEgresadoListadoComponent } from './movimiento-egresado-listado.component';

const routes: Routes = [
  {
    path: '',
    component: MovimientoEgresadoListadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoEgresadoListadoRoutingModule {}
