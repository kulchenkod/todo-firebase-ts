import { Reducer } from 'redux';
import { Actions } from './actions';
import * as types from './types';
import { Item } from '../../ts-types/projectsTypes';

const initialState = {
  loading: false,
  error: null as string | null,
  item: {} as Item,
};

export type BranchState = typeof initialState;

const reducer: Reducer<BranchState, Actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case types.GET_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ITEMS_SUCCESS:
      return {
        ...state,
        item: action.payload[0],
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
