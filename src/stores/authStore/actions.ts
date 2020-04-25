import { FORM_ERROR } from 'final-form';
import * as types from './types';
import { AuthValue, ResetPassword } from '../../authTypes';

export const createUserRequest = (values: AuthValue) => ({
  type: types.CREATE_USER_REQUEST,
  payload: values,
});

export const createUserSuccess = () => ({
  type: types.CREATE_USER_SUCCESS,
});

export const createUserResponse = (submissionErrors?: {
  [FORM_ERROR]: string;
}) => ({
  type: types.CREATE_USER_RESPONSE,
  payload: submissionErrors,
});

export const createUserFailure = (error: string) => ({
  type: types.CREATE_USER_FAILURE,
  payload: error,
});

export const signInRequest = (values: AuthValue) => ({
  type: types.SIGN_IN_REQUEST,
  payload: values,
});

export const signInSuccess = () => ({
  type: types.SIGN_IN_SUCCESS,
});

export const signInResponse = (submissionErrors?: {
  [FORM_ERROR]: string;
}) => ({
  type: types.SIGN_IN_RESPONSE,
  payload: submissionErrors,
});

export const signInFailure = (error: string) => ({
  type: types.SIGN_IN_FAILURE,
  payload: error,
});

export const ressetPasswordRequest = (values: ResetPassword) => ({
  type: types.RESSET_PASSWORD_REQUEST,
  payload: values,
});

export const ressetPasswordSuccess = () => ({
  type: types.RESSET_PASSWORD_SUCCESS,
});

export const ressetPasswordResponse = (submissionErrors?: {
  [FORM_ERROR]: string;
}) => ({
  type: types.RESSET_PASSWORD_RESPONSE,
  payload: submissionErrors,
});

export const ressetPasswordFailure = (error: string) => ({
  type: types.RESSET_PASSWORD_FAILURE,
  payload: error,
});

export type Actions =
  | ReturnType<typeof createUserRequest>
  | ReturnType<typeof createUserSuccess>
  | ReturnType<typeof createUserResponse>
  | ReturnType<typeof createUserFailure>
  | ReturnType<typeof signInRequest>
  | ReturnType<typeof signInSuccess>
  | ReturnType<typeof signInResponse>
  | ReturnType<typeof signInFailure>
  | ReturnType<typeof ressetPasswordRequest>
  | ReturnType<typeof ressetPasswordSuccess>
  | ReturnType<typeof ressetPasswordResponse>
  | ReturnType<typeof ressetPasswordFailure>;
