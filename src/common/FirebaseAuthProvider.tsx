import React, { createContext, useState, useEffect } from 'react';
import { User, auth } from 'firebase/app';
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
      setUser(firebaseUser);
    });
  };

  useEffect(() => {
    firebaseApp
      .auth()
      .setPersistence(auth.Auth.Persistence.LOCAL)
      .then(() => onAuthStateChanged());
  }, []);

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
