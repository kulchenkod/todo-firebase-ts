import React from 'react';
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import MakeAsyncFunction from 'react-redux-promise-listener';
import { Link } from 'react-router-dom';
import { promiseListener } from '../../setup';
import { types } from '../../stores/authStore';
import routes from '../../routes/routes';

const useStyles = makeStyles(theme => ({
  fileds: {
    marginBottom: '15px',
  },
  button: {
    width: '100%',
  },
}));

const SignIn: React.FC = () => {
  const style = useStyles();
  return (
    <>
      <Grid container item md={12} justify="center">
        <MakeAsyncFunction
          listener={promiseListener}
          start={types.SIGN_IN_REQUEST}
          resolve={types.SIGN_IN_RESPONSE}
          reject={types.SIGN_IN_FAILURE}
        >
          {onSubmit => (
            <Form
              onSubmit={async values => {
                const errors = await onSubmit(values);
                return errors;
              }}
            >
              {({ handleSubmit, submitErrors, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" className={style.fileds}>
                    <Typography align="center" variant="h5" gutterBottom>
                      Sign in page
                    </Typography>
                    <Field name="email">
                      {({ input: { name, value, onChange } }) => (
                        <TextField
                          label="Email"
                          type="email"
                          required
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    </Field>
                    <Field name="password">
                      {({ input: { name, value, onChange } }) => (
                        <TextField
                          label="Password"
                          type="password"
                          required
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    </Field>
                  </Grid>
                  {submitErrors && (
                    <Grid item xs={12}>
                      <FormHelperText error>{submitErrors}</FormHelperText>
                    </Grid>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={style.button}
                    disabled={submitting}
                  >
                    Sign in
                  </Button>
                  <Typography align="center" component="p" gutterBottom>
                    You not have account? <Link to={routes.join}>Join</Link>
                  </Typography>
                  <Typography align="center" component="p" gutterBottom>
                    <Link to={routes.forgotPassword}>Forgot password?</Link>
                  </Typography>
                </form>
              )}
            </Form>
          )}
        </MakeAsyncFunction>
      </Grid>
    </>
  );
};

export default SignIn;
