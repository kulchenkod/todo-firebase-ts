import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC8BnsMZTwYo08jmUXBOGFeu0103n2HdSU',
  authDomain: 'todos-ec68e.firebaseapp.com',
  databaseURL: 'https://todos-ec68e.firebaseio.com',
  projectId: 'todos-ec68e',
  storageBucket: 'todos-ec68e.appspot.com',
  messagingSenderId: '744571803358',
  appId: '1:744571803358:web:439d5be073b5a5ef28944f',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
