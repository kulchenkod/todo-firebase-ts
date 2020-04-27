import { Selector } from 'react-redux';
import { createSelector } from 'reselect';
import { BranchState } from './reducer';
import { Users } from '../../ts-types/usersTypes';

interface PartialRootState {
  usersReducer: BranchState;
}

const getUsers: Selector<PartialRootState, Users[]> = state =>
  state.usersReducer.users;

const getLoading: Selector<PartialRootState, boolean> = state =>
  state.usersReducer.loading;

export const selectUsers: Selector<
  PartialRootState,
  {
    users: Users[];
    loadingUsers: boolean;
  }
> = createSelector([getUsers, getLoading], (users, loadingUsers) => ({
  users,
  loadingUsers,
}));
