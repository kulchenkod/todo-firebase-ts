import { eventChannel } from 'redux-saga';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import firebaseApp from '../../config/firebaseConfig';
import { COLLECTIONS } from '../../environment';
import { Project } from '../../ts-types/projectsTypes';
import {
  addProject,
  deleteProject,
  updateProject,
} from '../../api/projectsApi';

function createAllProjectsChannel() {
  return eventChannel(emit => {
    firebaseApp
      .firestore()
      .collection(COLLECTIONS.projects)
      .onSnapshot(
        querySnapshot => {
          const projects: Project[] = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          querySnapshot.forEach((doc: any) => {
            projects.push(doc.data());
          });
          emit(projects);
        },
        () => emit(false),
      );
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  });
}
function* getAllProjectsWorker() {
  try {
    const channel = yield call(createAllProjectsChannel);
    while (true) {
      const data: Project[] = yield take(channel);
      if (data) {
        yield put(actions.getAllProjectsSuccess(data));
      }
    }
  } catch (error) {
    yield put(actions.getAllProjectsFailure(error));
  }
}

function* addNewProjectWorker({
  payload,
}: ReturnType<typeof actions.addNewProjectRequest>) {
  try {
    const data = yield call(addProject, payload);
    yield put(actions.addNewProjectSuccess(data));
  } catch (e) {
    yield put(actions.addNewProjectFailure(e));
  }
}

function* deleteProjectWorker({
  payload,
}: ReturnType<typeof actions.deleteProjectRequest>) {
  try {
    const data = yield call(deleteProject, payload);
    yield put(actions.deleteProjectSuccess(data));
  } catch (e) {
    yield put(actions.deleteProjectFailure(e));
  }
}

function* updateProjectWorker({
  payload,
}: ReturnType<typeof actions.updateProjectRequest>) {
  try {
    const data = yield call(updateProject, payload);
    yield put(actions.updateProjectSuccess(data));
  } catch (e) {
    yield put(actions.updateProjectFailure(e));
  }
}

export default function* watcher() {
  yield takeLatest(types.GET_ALL_PROJECTS_REQUEST, getAllProjectsWorker);
  yield takeLatest(types.ADD_NEW_PROJECT_REQUEST, addNewProjectWorker);
  yield takeLatest(types.DELETE_PROJECT_REQUEST, deleteProjectWorker);
  yield takeLatest(types.UPDATE_PROJECT_REQUEST, updateProjectWorker);
}
