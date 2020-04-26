import React, { useContext } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  makeStyles,
  Avatar,
  Button,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../common/FirebaseAuthProvider';
import useLogout from '../../hooks/useLogout';
import routes from '../../routes/routes';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
  },
  navigationWrapper: {
    justifyContent: 'space-between',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  avatar: {
    cursor: 'pointer',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const { user, signedIn } = useContext(AuthContext);
  const logout = useLogout();
  const history = useHistory();

  const name = user && user.email?.charAt(0).toUpperCase();

  const navigateToSignIn = () => history.push(routes.signin);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navigationWrapper}>
          <Link to={routes.home} className={classes.link}>
            <Typography display="inline" variant="h6">
              Todo project firebase application
            </Typography>
          </Link>
          {signedIn ? (
            <Avatar className={classes.avatar} onClick={logout}>
              {name}
            </Avatar>
          ) : (
            <Button variant="contained" onClick={navigateToSignIn}>
              SignIn
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
