import firebaseApp from '../config/firebaseConfig';

const useLogout = () => () => {
  firebaseApp.auth().signOut();
  window.location.href = '/signin';
};

export default useLogout;
