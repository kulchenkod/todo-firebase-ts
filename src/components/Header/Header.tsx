import React from 'react';
import { Typography, AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../../common/FirebaseAuthProvider';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  navigationWrapper: {
    justifyContent: 'space-between',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  // const { user, signedIn } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navigationWrapper}>
          <Link to="/" className={classes.link}>
            <Typography display="inline" variant="h6">
              Todo project firebase application
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
