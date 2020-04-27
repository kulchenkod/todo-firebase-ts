import { Reducer } from 'redux';
import { Actions } from './actions';
import * as types from './types';
import { Users } from '../../ts-types/usersTypes';

const initialState = {
  loading: false,
  error: null as string | null,
  users: [] as Users[],
};

export type BranchState = typeof initialState;

const reducer: Reducer<BranchState, Actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case types.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
