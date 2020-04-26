import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import UnPrivateRoute from './routes/UnPrivateRoute';
import PrivateRoute from './routes/PrivateRoute';
import store from './setup/store';
import { Join } from './components/Join';
import { SignIn } from './components/SignIn';
import { Header } from './components/Header';
import { ForgotPassword } from './components/ForgotPassword';
import { FirebaseAuthProvider } from './common/FirebaseAuthProvider';
import { Home } from './components/Home';
import { ProjectsContainer } from './components/Projects';
import { ProjectDetailsContainer } from './components/ProjectDetails';
import routes from './routes/routes';

const App: React.FC = () => (
  <FirebaseAuthProvider>
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <UnPrivateRoute exact path={routes.home} component={Home} />
          <UnPrivateRoute path={routes.join} component={Join} />
          <UnPrivateRoute path={routes.signin} component={SignIn} />
          <UnPrivateRoute
            path={routes.forgotPassword}
            component={ForgotPassword}
          />
          <PrivateRoute
            path={routes.projectDetails()}
            component={ProjectDetailsContainer}
          />
          <PrivateRoute path={routes.projects} component={ProjectsContainer} />
        </Switch>
      </Router>
    </Provider>
  </FirebaseAuthProvider>
);

export default App;
