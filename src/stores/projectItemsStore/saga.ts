import { eventChannel } from 'redux-saga';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import firebaseApp from '../../config/firebaseConfig';
import { COLLECTIONS } from '../../environment';
import { Item } from '../../ts-types/projectsTypes';
// import {
//   addProject,
//   deleteProject,
//   updateProject,
// } from '../../api/projectsApi';

function createAllProjectsChannel(id: string) {
  return (
    id &&
    eventChannel(emit => {
      firebaseApp
        .firestore()
        .collection(COLLECTIONS.projectItems)
        .where('projectId', '==', id)
        .onSnapshot(
          querySnapshot => {
            const item: Item[] = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            querySnapshot.forEach((doc: any) => {
              item.push(doc.data());
            });
            console.log(item);
            emit(item);
          },
          () => emit(false),
        );
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    })
  );
}
function* getItemWorker({
  payload,
}: ReturnType<typeof actions.getAllItemsRequest>) {
  try {
    const channel = yield call(createAllProjectsChannel, payload);
    while (true) {
      const data: Item[] = yield take(channel);
      if (data) {
        yield put(actions.getAllItemsSuccess(data));
      }
    }
  } catch (error) {
    yield put(actions.getAllItemsFailure(error));
  }
}

// function* addNewProjectWorker({
//   payload,
// }: ReturnType<typeof actions.addNewProjectRequest>) {
//   try {
//     const data = yield call(addProject, payload);
//     yield put(actions.addNewProjectSuccess(data));
//   } catch (e) {
//     yield put(actions.addNewProjectFailure(e));
//   }
// }

// function* deleteProjectWorker({
//   payload,
// }: ReturnType<typeof actions.deleteProjectRequest>) {
//   try {
//     const data = yield call(deleteProject, payload);
//     yield put(actions.deleteProjectSuccess(data));
//   } catch (e) {
//     yield put(actions.deleteProjectFailure(e));
//   }
// }

// function* updateProjectWorker({
//   payload,
// }: ReturnType<typeof actions.updateProjectRequest>) {
//   try {
//     const data = yield call(updateProject, payload);
//     yield put(actions.updateProjectSuccess(data));
//   } catch (e) {
//     yield put(actions.updateProjectFailure(e));
//   }
// }

export default function* watcher() {
  yield takeLatest(types.GET_ITEMS_REQUEST, getItemWorker);
  // yield takeLatest(types.ADD_NEW_PROJECT_REQUEST, addNewProjectWorker);
  // yield takeLatest(types.DELETE_PROJECT_REQUEST, deleteProjectWorker);
  // yield takeLatest(types.UPDATE_PROJECT_REQUEST, updateProjectWorker);
}
