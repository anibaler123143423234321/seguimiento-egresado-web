import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarreraRoutingModule } from './carrera-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CarreraRoutingModule,

    StoreModule.forFeature('carrera', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class CarreraModule {}
