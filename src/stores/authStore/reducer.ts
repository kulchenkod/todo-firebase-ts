import { Reducer } from 'redux';
import { Actions } from './actions';
import * as types from './types';

const initialState = {
  loading: false,
  error: null as string | null,
};

export type BranchState = typeof initialState;

const reducer: Reducer<BranchState, Actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case types.SIGN_IN_REQUEST:
    case types.CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.SIGN_IN_SUCCESS:
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case types.SIGN_IN_FAILURE:
    case types.CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
