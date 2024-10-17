import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarreraNuevoComponent } from './carrera-nuevo.component';

const routes: Routes = [
  {
    path: '',
    component: CarreraNuevoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarreraNuevoRoutingModule {}
