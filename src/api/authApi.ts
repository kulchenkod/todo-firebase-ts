import firebaseApp from '../config/firebaseConfig';
import { AuthValue } from '../authTypes';

export const createUser = ({ email, password }: AuthValue) =>
  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      firebaseApp.firestore().collection('users').add({
        email: res.user?.email,
      });
    })
    .catch(error => Promise.reject(error.message));

export const signInUser = ({ email, password }: AuthValue) =>
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => res)
    .catch(error => Promise.reject(error.message));
