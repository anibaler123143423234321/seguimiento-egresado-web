import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEntradaComponent } from './loginEntrada.component';

const routes: Routes = [
  {
    path: '',
    component: LoginEntradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginEntradaRoutingModule {}
