import firebaseApp from '../config/firebaseConfig';
import { Item } from '../ts-types/projectsTypes';
import { COLLECTIONS } from '../environment';

export const addTask = (value: Item) =>
  firebaseApp
    .firestore()
    .collection(COLLECTIONS.projectItems)
    .doc(value.projectId)
    .set(value)
    .then(res => res)
    .catch(error => Promise.reject(error.message));

export const deleteTask = (value: Item) =>
  firebaseApp
    .firestore()
    .collection(COLLECTIONS.projectItems)
    .doc(value.projectId)
    .set(value)
    .then(res => res)
    .catch(error => Promise.reject(error.message));

export const changeTaskStatus = (value: Item) =>
  firebaseApp
    .firestore()
    .collection(COLLECTIONS.projectItems)
    .doc(value.projectId)
    .set(value)
    .then(res => res)
    .catch(error => Promise.reject(error.message));

export const assignedTaskToUser = (value: Item) =>
  firebaseApp
    .firestore()
    .collection(COLLECTIONS.projectItems)
    .doc(value.projectId)
    .set(value)
    .then(res => res)
    .catch(error => Promise.reject(error.message));
