import { all } from 'redux-saga/effects';
import { saga as authSaga } from '../stores/authStore';

export default function* rootSaga() {
  yield all([authSaga()]);
}
