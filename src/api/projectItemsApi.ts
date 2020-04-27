import firebaseApp from '../config/firebaseConfig';
import { Item } from '../ts-types/projectsTypes';
import { COLLECTIONS } from '../environment';

export const addTask = (value: Item) =>
  firebaseApp
    .firestore()
    .collection(COLLECTIONS.projectItems)
    .doc(value.id)
    .set({
      assignedUsers: [],
      isDone: false,
      ...value,
    })
    .then(res => res)
    .catch(error => Promise.reject(error.message));

// export const deleteTask = (value: string) =>
//   firebaseApp
//     .firestore()
//     .collection(COLLECTIONS.projects)
//     .doc(taskId)
//     .delete()
//     .then(res =>
//       firebaseApp
//         .firestore()
//         .collection(COLLECTIONS.projectItems)
//         .doc(projectId)
//         .delete(),
//     )
//     .catch(error => Promise.reject(error.message));

// export const updateProject = (value: Item) =>
//   firebaseApp
//     .firestore()
//     .collection(COLLECTIONS.projects)
//     .doc(value.id)
//     .update(value)
//     .then(res => res)
//     .catch(error => Promise.reject(error.message));
