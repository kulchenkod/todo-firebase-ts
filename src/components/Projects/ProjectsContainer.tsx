import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import {
  CircularProgress,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import uniqid from 'uniqid';
import {
  getAllProjectsRequest,
  addNewProjectRequest,
  deleteProjectRequest,
  updateProjectRequest,
} from '../../stores/projectsStore/actions';
import { selectProjects } from '../../stores/projectsStore/selectors';
import ProjectItem from './ProjectItem';
import { Project } from '../../ts-types/projectsTypes';

const ProjectsContainer: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { data, loading } = useSelector(selectProjects);

  useEffect(() => {
    dispatch(getAllProjectsRequest());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProject = useCallback(
    (projectId: string) => {
      dispatch(deleteProjectRequest(projectId));
    },
    [dispatch],
  );

  const renderProjectItem = (project: Project) => (
    <ProjectItem
      key={project.id}
      handleDeleteProject={handleDeleteProject}
      updateProject={updateProject}
      project={project}
    />
  );

  const onSubmit = ({ title, description }: Record<string, string>) => {
    dispatch(
      addNewProjectRequest({
        id: uniqid(),
        title,
        description,
      }),
    );
    handleClose();
  };

  const updateProject = useCallback(
    (value: Project) => {
      dispatch(updateProjectRequest(value));
    },
    [dispatch],
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add new project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create new project</DialogTitle>
        <DialogContent>
          <Form onSubmit={onSubmit}>
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
                  Add project
                </Button>
              </form>
            )}
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        {data.length ? data.map(renderProjectItem) : <p>Projects is empty</p>}
      </Grid>
    </>
  );
};

export default ProjectsContainer;
