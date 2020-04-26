import { all } from 'redux-saga/effects';
import { saga as authSaga } from '../stores/authStore';
import { saga as projectsSaga } from '../stores/projectsStore';
import { saga as tasksSaga } from '../stores/projectItemsStore';

export default function* rootSaga() {
  yield all([authSaga(), projectsSaga(), tasksSaga()]);
}
