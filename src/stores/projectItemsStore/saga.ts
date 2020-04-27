import { eventChannel } from 'redux-saga';
import { call, put, take, takeLatest, select } from 'redux-saga/effects';
import uniqid from 'uniqid';
import * as actions from './actions';
import * as types from './types';
import firebaseApp from '../../config/firebaseConfig';
import { COLLECTIONS } from '../../environment';
import { Item } from '../../ts-types/projectsTypes';
import {
  addTask,
  deleteTask,
  changeTaskStatus,
  assignedTaskToUser,
} from '../../api/projectItemsApi';
import { selectItems } from './selectors';

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

function* addTaskWorker({
  payload,
}: ReturnType<typeof actions.addTaskRequest>) {
  try {
    const { data }: { data: Item } = yield select(selectItems);
    const newTask = {
      ...data,
      tasksList: [
        ...data.tasksList,
        {
          assignedUsers: [],
          title: payload,
          id: uniqid(),
          isDone: false,
        },
      ],
    };
    const dataTask = yield call(addTask, newTask);
    yield put(actions.addTaskSuccess(dataTask));
  } catch (e) {
    yield put(actions.addTaskFailure(e));
  }
}

function* deleteTaskWorker({
  payload,
}: ReturnType<typeof actions.deleteTaskRequest>) {
  try {
    const { data }: { data: Item } = yield select(selectItems);
    data.tasksList = data.tasksList.filter(({ id }) => id !== payload);

    const dataTask = yield call(deleteTask, data);
    yield put(actions.deleteTaskSuccess(dataTask));
  } catch (e) {
    yield put(actions.deleteTaskFailure(e));
  }
}

function* changeTaskStatusWorker({
  payload,
}: ReturnType<typeof actions.changeTaskStatusRequest>) {
  try {
    const { data }: { data: Item } = yield select(selectItems);
    const index = data.tasksList.findIndex(({ id }) => id === payload.taskId);
    data.tasksList[index].isDone = payload.status;

    const dataTask = yield call(changeTaskStatus, data);

    yield put(actions.changeTaskStatusSuccess(dataTask));
  } catch (e) {
    yield put(actions.changeTaskStatusFailure(e));
  }
}

function* assignedTaskWorker({
  payload,
}: ReturnType<typeof actions.assignedTaskRequest>) {
  try {
    const { data }: { data: Item } = yield select(selectItems);
    const index = data.tasksList.findIndex(({ id }) => id === payload.taskId);
    data.tasksList[index].assignedUsers = payload.assignedUsers;

    const dataTask = yield call(assignedTaskToUser, data);

    yield put(actions.assignedTaskSuccess(dataTask));
  } catch (e) {
    yield put(actions.assignedTaskFailure(e));
  }
}

export default function* watcher() {
  yield takeLatest(types.GET_ITEMS_REQUEST, getItemWorker);
  yield takeLatest(types.ADD_TASK_REQUEST, addTaskWorker);
  yield takeLatest(types.DELETE_TASK_REQUEST, deleteTaskWorker);
  yield takeLatest(types.CHANGE_TASK_STATUS_REQUEST, changeTaskStatusWorker);
  yield takeLatest(types.ASSIGNE_TASK_REQUEST, assignedTaskWorker);
}
