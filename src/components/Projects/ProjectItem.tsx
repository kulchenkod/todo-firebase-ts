import React from 'react';
import { Form, Field } from 'react-final-form';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router';
import { Project } from '../../ts-types/projectsTypes';
import routes from '../../routes/routes';

type Props = {
  project: Project;
  handleDeleteProject: (id: string) => void;
  updateProject: (value: Project) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '150px',
      cursor: 'pointer',
    },
  }),
);

const ProjectItem: React.FC<Props> = ({
  project: { id, title, description },
  handleDeleteProject,
  updateProject,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpenMenu] = React.useState<boolean>(false);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDialog = () => {
    setOpenMenu(false);
  };

  const handleOpenDialog = () => {
    setOpenMenu(true);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteProject = () => {
    handleDeleteProject(id);
    handleClose();
  };

  const onSubmit = (value: Project) => {
    updateProject(value);
    handleClose();
    handleCloseDialog();
  };

  const navigateToDetails = () => {
    history.push(`${routes.projectDetails(id)}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenDialog}>Edit</MenuItem>
        <MenuItem onClick={deleteProject}>Delete</MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update this project</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              id,
              title,
              description,
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container direction="column">
                  <Field name="title" fullWidth>
                    {({ input: { name, value, onChange } }) => (
                      <TextField
                        label="Title"
                        type="text"
                        required
                        name={name}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  </Field>
                  <Field name="description" fullWidth>
                    {({ input: { name, value, onChange } }) => (
                      <TextField
                        label="Description"
                        type="text"
                        required
                        name={name}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  </Field>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Update project
                </Button>
              </form>
            )}
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Paper className={classes.root} elevation={3} onClick={navigateToDetails}>
        <Typography align="center" variant="h6">
          {title}
        </Typography>
        <Typography align="left" component="p">
          Description: {description}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default React.memo(ProjectItem);
