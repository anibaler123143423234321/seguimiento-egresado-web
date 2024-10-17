import { createSelector } from '@ngrx/store';
import { getEgresadoState, EgresadoState } from '../index';

import { ListState } from './save.reducer';

export const getListState = createSelector(
  getEgresadoState,
  (state: EgresadoState) => state.list
);

export const getLoading = createSelector(
  getListState,
  (state: ListState) => state.loading
);

export const getCarreras = createSelector(
  getListState,
  (state: ListState) => state.egresados
);
