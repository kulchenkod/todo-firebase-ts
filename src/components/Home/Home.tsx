import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';

const Home: React.FC = () => (
  <main>
    <Grid container item md={12} justify="center" direction="column">
      <Typography align="center" variant="h4" gutterBottom>
        Welcome to TODO projects application!
      </Typography>
      <Typography align="center" component="p" gutterBottom>
        If you not account here, navigate to <Link to={routes.join}> Join</Link>
      </Typography>
      <Typography align="center" component="p" gutterBottom>
        But, if you have account, navigate to{' '}
        <Link to={routes.signin}> Sign in</Link>
      </Typography>
    </Grid>
  </main>
);

export default Home;
