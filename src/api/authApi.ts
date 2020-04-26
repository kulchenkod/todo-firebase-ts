import firebaseApp from '../config/firebaseConfig';
import { AuthValue, ResetPassword } from '../ts-types/authTypes';
import { ACTION_RESET_EMAIL } from '../environment';

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

export const ressetPassword = ({ email }: ResetPassword) =>
  firebaseApp
    .auth()
    .sendPasswordResetEmail(email, ACTION_RESET_EMAIL)
    .then(res => res)
    .catch(error => Promise.reject(error.message));
