import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginEntradaRoutingModule } from './loginEntrada-routing.module';
import { LoginEntradaComponent } from './loginEntrada.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerModule } from '@app/shared/indicators';

@NgModule({
  declarations: [LoginEntradaComponent],
  imports: [
    CommonModule,
    LoginEntradaRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,

    MatIconModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    SpinnerModule,
  ],
})
export class LoginEntradaModule {}
