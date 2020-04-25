import firebaseApp from '../config/firebaseConfig';

const useLogout = () => () => {
  firebaseApp.auth().signOut();
};

export default useLogout;
