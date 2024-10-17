import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEstudianteComponent } from './loginEstudiante.component';

const routes: Routes = [
  {
    path: '',
    component: LoginEstudianteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEstudianteRoutingModule {}
