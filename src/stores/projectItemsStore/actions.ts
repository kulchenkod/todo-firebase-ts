import * as types from './types';
import { Item } from '../../ts-types/projectsTypes';

export const getAllItemsRequest = (projectId: string) => ({
  type: types.GET_ITEMS_REQUEST,
  payload: projectId,
});

export const getAllItemsSuccess = (items: Item[]) => ({
  type: types.GET_ITEMS_SUCCESS,
  payload: items,
});

export const getAllItemsFailure = (error: string) => ({
  type: types.GET_ITEMS_FAILURE,
  payload: error,
});

export const addNewItemRequest = (value: Item) => ({
  type: types.ADD_NEW_ITEM_REQUEST,
  payload: value,
});

export const addNewItemSuccess = (items: Item) => ({
  type: types.ADD_NEW_ITEM_SUCCESS,
  payload: items,
});

export const addNewItemFailure = (error: string) => ({
  type: types.ADD_NEW_ITEM_FAILURE,
  payload: error,
});

// export const deleteProjectRequest = (projectId: string) => ({
//   type: types.DELETE_PROJECT_REQUEST,
//   payload: projectId,
// });

// export const deleteProjectSuccess = (projects: Project) => ({
//   type: types.DELETE_PROJECT_SUCCESS,
//   payload: projects,
// });

// export const deleteProjectFailure = (error: string) => ({
//   type: types.DELETE_PROJECT_FAILURE,
//   payload: error,
// });

// export const updateProjectRequest = (value: Project) => ({
//   type: types.UPDATE_PROJECT_REQUEST,
//   payload: value,
// });

// export const updateProjectSuccess = (projects: Project) => ({
//   type: types.UPDATE_PROJECT_SUCCESS,
//   payload: projects,
// });

// export const updateProjectFailure = (error: string) => ({
//   type: types.UPDATE_PROJECT_FAILURE,
//   payload: error,
// });

export type Actions =
  | ReturnType<typeof addNewItemRequest>
  | ReturnType<typeof addNewItemSuccess>
  | ReturnType<typeof addNewItemFailure>
  | ReturnType<typeof getAllItemsRequest>
  | ReturnType<typeof getAllItemsSuccess>
  | ReturnType<typeof getAllItemsFailure>;
