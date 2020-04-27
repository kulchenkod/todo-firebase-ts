import * as types from './types';
import { Users } from '../../ts-types/usersTypes';

export const getAllUsersRequest = () => ({
  type: types.GET_ALL_USERS_REQUEST,
});

export const getAllUsersSuccess = (users: Users[]) => ({
  type: types.GET_ALL_USERS_SUCCESS,
  payload: users,
});

export const getAllUsersFailure = (error: string) => ({
  type: types.GET_ALL_USERS_FAILURE,
  payload: error,
});

export type Actions =
  | ReturnType<typeof getAllUsersRequest>
  | ReturnType<typeof getAllUsersSuccess>
  | ReturnType<typeof getAllUsersFailure>;
