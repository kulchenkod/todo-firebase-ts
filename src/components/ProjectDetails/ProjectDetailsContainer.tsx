import React, { useEffect, useState, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
} from '@material-ui/core';
import { useParams } from 'react-router';
import {
  getAllItemsRequest,
  addTaskRequest,
  deleteTaskRequest,
  changeTaskStatusRequest,
  assignedTaskRequest,
} from '../../stores/projectItemsStore/actions';
import { getAllUsersRequest } from '../../stores/usersStore/actions';
import { selectItems } from '../../stores/projectItemsStore/selectors';
import { selectUsers } from '../../stores/usersStore/selectors';
import ProjectDetailsItem from './ProjectDetailsItem';
import { Task } from '../../ts-types/projectsTypes';

const ProjectDetailsContainer: React.FC = () => {
  const [valueTask, setValueTask] = useState<string>('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: { tasksList = [] },
    loading,
  } = useSelector(selectItems);

  const { users, loadingUsers } = useSelector(selectUsers);

  useEffect(() => {
    if (id) {
      dispatch(getAllItemsRequest(id));
      dispatch(getAllUsersRequest());
    }
  }, [dispatch, id]);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValueTask(value);
  };

  const addTask = () => {
    dispatch(addTaskRequest(valueTask));
    setValueTask('');
  };

  const deleteTask = useCallback(
    (taskId: string) => {
      dispatch(deleteTaskRequest(taskId));
    },
    [dispatch],
  );

  const changeTaskStatus = useCallback(
    (taskId: string, status: boolean) => {
      dispatch(changeTaskStatusRequest(taskId, status));
    },
    [dispatch],
  );

  const assignedUser = useCallback(
    (taskId: string, usersToAssigne: string[]) => {
      dispatch(assignedTaskRequest(taskId, usersToAssigne));
    },
    [dispatch],
  );

  const renderTask = (task: Task) => (
    <Fragment key={task.id}>
      <ProjectDetailsItem
        task={task}
        assignedUser={assignedUser}
        deleteTask={deleteTask}
        changeTaskStatus={changeTaskStatus}
        users={users}
      />
      <Divider />
    </Fragment>
  );

  if (loading && loadingUsers) {
    return <CircularProgress />;
  }

  return (
    <>
      <Grid container justify="flex-start">
        <TextField
          value={valueTask}
          type="text"
          label="Task name"
          onChange={handleChange}
        />
        <Button
          disabled={!valueTask?.length}
          variant="contained"
          color="primary"
          onClick={addTask}
        >
          Add new task
        </Button>
      </Grid>

      <Grid container justify="center" spacing={3}>
        <Grid item md={8} xs={12}>
          <Paper elevation={3}>
            <Typography align="center" variant="h6">
              TODO
            </Typography>
            {tasksList.length ? (
              tasksList.map(renderTask)
            ) : (
              <p>Tasks is empty</p>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default ProjectDetailsContainer;
