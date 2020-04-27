import { Selector } from 'react-redux';
import { createSelector } from 'reselect';
import { BranchState } from './reducer';
import { Item } from '../../ts-types/projectsTypes';

interface PartialRootState {
  tasksReducer: BranchState;
}

const getItems: Selector<PartialRootState, Item> = state =>
  state.tasksReducer.item;

const getLoading: Selector<PartialRootState, boolean> = state =>
  state.tasksReducer.loading;

export const selectItems: Selector<
  PartialRootState,
  {
    data: Item;
    loading: boolean;
  }
> = createSelector([getItems, getLoading], (item, loading) => ({
  data: item,
  loading,
}));
