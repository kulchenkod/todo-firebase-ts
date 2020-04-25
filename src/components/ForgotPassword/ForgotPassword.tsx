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

const useStyles = makeStyles(theme => ({
  fileds: {
    marginBottom: '15px',
  },
  button: {
    width: '100%',
  },
}));

const Join: React.FC = () => {
  const style = useStyles();
  return (
    <>
      <Grid container item md={12} justify="center">
        <MakeAsyncFunction
          listener={promiseListener}
          start={types.RESSET_PASSWORD_REQUEST}
          resolve={types.RESSET_PASSWORD_RESPONSE}
          reject={types.RESSET_PASSWORD_FAILURE}
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
                      Forgot password page
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
                    Reset Password
                  </Button>
                  <Typography align="center" component="p" gutterBottom>
                    You have account? <Link to="/signin">Sign in</Link>
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

export default Join;
