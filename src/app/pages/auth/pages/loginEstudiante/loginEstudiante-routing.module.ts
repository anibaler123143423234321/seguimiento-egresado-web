import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEgresadoComponent } from './loginEstudiante.component';

const routes: Routes = [
  {
    path: '',
    component: LoginEgresadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEstudianteRoutingModule {}
