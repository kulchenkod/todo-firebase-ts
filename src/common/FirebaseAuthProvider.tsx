import React, { createContext, useState, useEffect } from 'react';
import { User, auth } from 'firebase/app';
// import queryString from 'query-string';
import firebaseApp from '../config/firebaseConfig';

export type Auth = {
  instance: any;
  user: User | null;
  signedIn: boolean;
};

export const AuthContext = createContext<Auth>({
  instance: null,
  user: null,
  signedIn: false,
});

export const FirebaseAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const onAuthStateChanged = () => {
    return firebaseApp.auth().onAuthStateChanged(firebaseUser => {
      console.log(firebaseUser, 'FB USER');
      setUser(firebaseUser);
      // if (firebaseUser) {
      //   userLoggedIn(firebaseUser, this.userEvent, isOffline);
      // }
    });
  };

  useEffect(() => {
    firebaseApp
      .auth()
      .setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() => onAuthStateChanged());
  }, []);

  // const email = getEmail();
  // if (email && window.location.href.includes('apiKey')) {
  //   this.onEmailSignIn(email);
  // }

  // const logout = () => {
  //   firebaseApp
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       userLoggedOut();
  //     });
  // };

  return (
    <AuthContext.Provider
      value={{
        instance: firebaseApp.auth(),
        user,
        signedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default FirebaseAuthProvider;
