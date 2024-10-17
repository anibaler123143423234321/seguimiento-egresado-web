import { createSelector } from '@ngrx/store';
import { getMovimientoEgresadoState, MovimientoEgresadoState } from '../index';

import { ListState } from './save.reducer';

export const getListState = createSelector(
  getMovimientoEgresadoState,
  (state: MovimientoEgresadoState) => state.list
);

export const getLoading = createSelector(
  getListState,
  (state: ListState) => state.loading
);

export const getCarreras = createSelector(
  getListState,
  (state: ListState) => state.movimientos
);
