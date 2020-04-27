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

export const addTaskRequest = (value: string) => ({
  type: types.ADD_TASK_REQUEST,
  payload: value,
});

export const addTaskSuccess = (items: Item) => ({
  type: types.ADD_TASK_SUCCESS,
  payload: items,
});

export const addTaskFailure = (error: string) => ({
  type: types.ADD_TASK_FAILURE,
  payload: error,
});

export const deleteTaskRequest = (taskId: string) => ({
  type: types.DELETE_TASK_REQUEST,
  payload: taskId,
});

export const deleteTaskSuccess = (items: Item) => ({
  type: types.DELETE_TASK_SUCCESS,
  payload: items,
});

export const deleteTaskFailure = (error: string) => ({
  type: types.DELETE_TASK_FAILURE,
  payload: error,
});

export const changeTaskStatusRequest = (taskId: string, status: boolean) => ({
  type: types.CHANGE_TASK_STATUS_REQUEST,
  payload: { taskId, status },
});

export const changeTaskStatusSuccess = (items: Item) => ({
  type: types.CHANGE_TASK_STATUS_SUCCESS,
  payload: items,
});

export const changeTaskStatusFailure = (error: string) => ({
  type: types.CHANGE_TASK_STATUS_FAILURE,
  payload: error,
});

export const assignedTaskRequest = (
  taskId: string,
  assignedUsers: string[],
) => ({
  type: types.ASSIGNE_TASK_REQUEST,
  payload: { taskId, assignedUsers },
});

export const assignedTaskSuccess = (items: Item) => ({
  type: types.ASSIGNE_TASK_SUCCESS,
  payload: items,
});

export const assignedTaskFailure = (error: string) => ({
  type: types.ASSIGNE_TASK_FAILURE,
  payload: error,
});

export type Actions =
  | ReturnType<typeof assignedTaskRequest>
  | ReturnType<typeof assignedTaskSuccess>
  | ReturnType<typeof assignedTaskFailure>
  | ReturnType<typeof changeTaskStatusRequest>
  | ReturnType<typeof changeTaskStatusSuccess>
  | ReturnType<typeof changeTaskStatusFailure>
  | ReturnType<typeof deleteTaskRequest>
  | ReturnType<typeof deleteTaskSuccess>
  | ReturnType<typeof deleteTaskFailure>
  | ReturnType<typeof addTaskRequest>
  | ReturnType<typeof addTaskSuccess>
  | ReturnType<typeof addTaskFailure>
  | ReturnType<typeof getAllItemsRequest>
  | ReturnType<typeof getAllItemsSuccess>
  | ReturnType<typeof getAllItemsFailure>;
