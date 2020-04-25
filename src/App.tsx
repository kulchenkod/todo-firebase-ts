import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import UnPrivateRoute from './routes/UnPrivateRoute';
import store from './setup/store';
import { Join } from './components/Join';
import { SignIn } from './components/SignIn';
import { Header } from './components/Header';
import { ForgotPassword } from './components/ForgotPassword';
import { FirebaseAuthProvider } from './common/FirebaseAuthProvider';

const App: React.FC = () => (
  <FirebaseAuthProvider>
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <UnPrivateRoute exact path="/join" component={Join} />
          <UnPrivateRoute exact path="/signin" component={SignIn} />
          <UnPrivateRoute
            exact
            path="/forgot-password"
            component={ForgotPassword}
          />
        </Switch>
      </Router>
    </Provider>
  </FirebaseAuthProvider>
);

export default App;
