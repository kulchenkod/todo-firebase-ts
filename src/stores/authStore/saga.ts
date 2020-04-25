import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import { createUser, signInUser, ressetPassword } from '../../api/authApi';

function* createUserWorker({
  payload,
}: ReturnType<typeof actions.createUserRequest>) {
  try {
    yield call(createUser, payload);
    yield all([
      put(actions.createUserSuccess()),
      put(actions.createUserResponse()),
    ]);
  } catch (e) {
    yield put(actions.createUserResponse(e));
  }
}

function* signInWorker({ payload }: ReturnType<typeof actions.signInRequest>) {
  try {
    yield call(signInUser, payload);
    yield all([put(actions.signInSuccess()), put(actions.signInResponse())]);
  } catch (e) {
    yield put(actions.signInResponse(e));
  }
}

function* ressetPasswordWorker({
  payload,
}: ReturnType<typeof actions.ressetPasswordRequest>) {
  try {
    yield call(ressetPassword, payload);
    yield all([
      put(actions.ressetPasswordSuccess()),
      put(actions.ressetPasswordResponse()),
    ]);
  } catch (e) {
    yield put(actions.ressetPasswordResponse(e));
  }
}

export default function* watcher() {
  yield takeLatest(types.CREATE_USER_REQUEST, createUserWorker);
  yield takeLatest(types.SIGN_IN_REQUEST, signInWorker);
  yield takeLatest(types.RESSET_PASSWORD_REQUEST, ressetPasswordWorker);
}
