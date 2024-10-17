import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgresadoNuevoComponent } from './egresado-nuevo.component';

const routes: Routes = [
  {
    path: '',
    component: EgresadoNuevoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresadoNuevoRoutingModule {}
