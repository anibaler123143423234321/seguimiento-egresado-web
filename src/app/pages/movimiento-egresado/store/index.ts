import * as fromList from './save/save.reducer';
import { SaveEffects } from './save/save.effects';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface MovimientoEgresadoState {
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<MovimientoEgresadoState> = {
  list: fromList.reducer,
};

export const effects: any = [SaveEffects];

export const getMovimientoEgresadoState =
  createFeatureSelector<MovimientoEgresadoState>('movimiento_egresado');
