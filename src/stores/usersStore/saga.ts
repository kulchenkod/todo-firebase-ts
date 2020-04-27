import { eventChannel } from 'redux-saga';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import firebaseApp from '../../config/firebaseConfig';
import { COLLECTIONS } from '../../environment';
import { Users } from '../../ts-types/usersTypes';

function createAllUsersChannel() {
  return eventChannel(emit => {
    firebaseApp
      .firestore()
      .collection(COLLECTIONS.users)
      .onSnapshot(
        querySnapshot => {
          const users: Users[] = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          querySnapshot.forEach((doc: any) => {
            users.push(doc.data());
          });
          emit(users);
        },
        () => emit(false),
      );
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  });
}
function* getAllUsersWorker() {
  try {
    const channel = yield call(createAllUsersChannel);
    while (true) {
      const data: Users[] = yield take(channel);
      if (data) {
        yield put(actions.getAllUsersSuccess(data));
      }
    }
  } catch (error) {
    yield put(actions.getAllUsersFailure(error));
  }
}

export default function* watcher() {
  yield takeLatest(types.GET_ALL_USERS_REQUEST, getAllUsersWorker);
}
