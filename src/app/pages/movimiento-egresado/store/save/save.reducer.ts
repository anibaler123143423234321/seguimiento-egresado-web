import { MovimientoEgresadoResponse } from './save.models';
import * as fromActions from './save.actions';

export interface ListState {
  movimientos: MovimientoEgresadoResponse[] | null;
  movimiento: MovimientoEgresadoResponse | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: ListState = {
  movimientos: null,
  movimiento: null,
  loading: null,
  error: null,
};

export function reducer(
  state: ListState = initialState,
  action: fromActions.All | any
) {
  switch (action.type) {
    case fromActions.Types.CREATE: {
      return { ...state, loading: true, error: null };
    }

    case fromActions.Types.CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        movimiento: action.movimiento,
      };
    }

    case fromActions.Types.CREATE_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    case fromActions.Types.READ: {
      return { ...state, loading: true, error: null };
    }

    case fromActions.Types.READ_SUCCESS: {
      return { ...state, loading: false, movimientos: action.movimientos };
    }

    case fromActions.Types.READ_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    default: {
      return state;
    }
  }
}
