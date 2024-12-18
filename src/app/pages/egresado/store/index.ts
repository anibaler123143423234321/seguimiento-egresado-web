import * as fromList from './save/save.reducer';
import { SaveEffects } from './save/save.effects';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface EgresadoState {
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<EgresadoState> = {
  list: fromList.reducer,
};

export const effects: any = [SaveEffects];

export const getEgresadoState =
  createFeatureSelector<EgresadoState>('egresado');
