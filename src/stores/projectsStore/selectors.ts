import { Selector } from 'react-redux';
import { createSelector } from 'reselect';
import { BranchState } from './reducer';
import { Project } from '../../ts-types/projectsTypes';

interface PartialRootState {
  projectsReducer: BranchState;
}

const getProjects: Selector<PartialRootState, Project[]> = state =>
  state.projectsReducer.projects;

const getLoading: Selector<PartialRootState, boolean> = state =>
  state.projectsReducer.loading;

export const selectProjects: Selector<
  PartialRootState,
  {
    data: Project[];
    loading: boolean;
  }
> = createSelector([getProjects, getLoading], (collection, loading) => ({
  data: collection,
  loading,
}));
