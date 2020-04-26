import firebaseApp from '../config/firebaseConfig';
import { Project } from '../ts-types/projectsTypes';
import { COLLECTIONS } from '../environment';

export const addProject = (value: Project) =>
  firebaseApp
    .firestore()
    .collection(COLLECTIONS.projects)
    .doc(value.id)
    .set(value)
    .then(res =>
      firebaseApp
        .firestore()
        .collection(COLLECTIONS.projectItems)
        .doc(value.id)
        .set({
          projectId: value.id,
          tasksList: [],
        }),
    )
    .catch(error => Promise.reject(error.message));

export const deleteProject = (projectId: string) =>
  firebaseApp
    .firestore()
    .collection(COLLECTIONS.projects)
    .doc(projectId)
    .delete()
    .then(res =>
      firebaseApp
        .firestore()
        .collection(COLLECTIONS.projectItems)
        .doc(projectId)
        .delete(),
    )
    .catch(error => Promise.reject(error.message));

export const updateProject = (value: Project) =>
  firebaseApp
    .firestore()
    .collection(COLLECTIONS.projects)
    .doc(value.id)
    .update(value)
    .then(res => res)
    .catch(error => Promise.reject(error.message));
