import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../common/FirebaseAuthProvider';
import routes from './routes';

const PrivateRoute = ({ ...rest }) => {
  const { signedIn } = useContext(AuthContext);

  if (!signedIn) {
    return <Redirect to={routes.home} />;
  }
  return <Route {...rest} />;
};

export default PrivateRoute;
