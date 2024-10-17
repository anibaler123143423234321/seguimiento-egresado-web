import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoEgresadoRoutingModule } from './movimiento-egresado-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MovimientoEgresadoRoutingModule,

    StoreModule.forFeature('movimiento_egresado', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class MovimientoEgresadoModule {}
