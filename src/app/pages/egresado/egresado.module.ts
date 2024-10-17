import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresadoRoutingModule } from './egresado-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EgresadoRoutingModule,

    StoreModule.forFeature('egresado', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class EgresadoModule {}
