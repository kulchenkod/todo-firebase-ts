import { Reducer } from 'redux';
import { Actions } from './actions';
import * as types from './types';
import { Project } from '../../ts-types/projectsTypes';

const initialState = {
  loading: false,
  error: null as string | null,
  projects: [] as Project[],
};

export type BranchState = typeof initialState;

const reducer: Reducer<BranchState, Actions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case types.GET_ALL_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
