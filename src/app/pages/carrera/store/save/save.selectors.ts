import { createSelector } from '@ngrx/store';
import { getCarreraState, CarreraState } from '../index';

import { ListState } from './save.reducer';

export const getListState = createSelector(
  getCarreraState,
  (state: CarreraState) => state.list
);

export const getLoading = createSelector(
  getListState,
  (state: ListState) => state.loading
);

export const getCarreras = createSelector(
  getListState,
  (state: ListState) => state.carreras
);
