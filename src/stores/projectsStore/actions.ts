import * as types from './types';
import { Project } from '../../ts-types/projectsTypes';

export const getAllProjectsRequest = () => ({
  type: types.GET_ALL_PROJECTS_REQUEST,
});

export const getAllProjectsSuccess = (projects: Project[]) => ({
  type: types.GET_ALL_PROJECTS_SUCCESS,
  payload: projects,
});

export const getAllProjectsFailure = (error: string) => ({
  type: types.GET_ALL_PROJECTS_FAILURE,
  payload: error,
});

export const addNewProjectRequest = (value: Project) => ({
  type: types.ADD_NEW_PROJECT_REQUEST,
  payload: value,
});

export const addNewProjectSuccess = (projects: Project) => ({
  type: types.ADD_NEW_PROJECT_SUCCESS,
  payload: projects,
});

export const addNewProjectFailure = (error: string) => ({
  type: types.ADD_NEW_PROJECT_FAILURE,
  payload: error,
});

export const deleteProjectRequest = (projectId: string) => ({
  type: types.DELETE_PROJECT_REQUEST,
  payload: projectId,
});

export const deleteProjectSuccess = (projects: Project) => ({
  type: types.DELETE_PROJECT_SUCCESS,
  payload: projects,
});

export const deleteProjectFailure = (error: string) => ({
  type: types.DELETE_PROJECT_FAILURE,
  payload: error,
});

export const updateProjectRequest = (value: Project) => ({
  type: types.UPDATE_PROJECT_REQUEST,
  payload: value,
});

export const updateProjectSuccess = (projects: Project) => ({
  type: types.UPDATE_PROJECT_SUCCESS,
  payload: projects,
});

export const updateProjectFailure = (error: string) => ({
  type: types.UPDATE_PROJECT_FAILURE,
  payload: error,
});

export type Actions =
  | ReturnType<typeof updateProjectRequest>
  | ReturnType<typeof updateProjectSuccess>
  | ReturnType<typeof updateProjectFailure>
  | ReturnType<typeof deleteProjectRequest>
  | ReturnType<typeof deleteProjectSuccess>
  | ReturnType<typeof deleteProjectFailure>
  | ReturnType<typeof addNewProjectRequest>
  | ReturnType<typeof addNewProjectSuccess>
  | ReturnType<typeof addNewProjectFailure>
  | ReturnType<typeof getAllProjectsRequest>
  | ReturnType<typeof getAllProjectsSuccess>
  | ReturnType<typeof getAllProjectsFailure>;
