import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresadoListadoComponent } from './egresado-listado.component';

const routes: Routes = [
  {
    path: '',
    component: EgresadoListadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresadoListadoRoutingModule {}
