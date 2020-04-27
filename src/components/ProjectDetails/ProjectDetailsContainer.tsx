import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
} from '@material-ui/core';
import { useParams } from 'react-router';
import { getAllItemsRequest } from '../../stores/projectItemsStore/actions';
import { selectItems } from '../../stores/projectItemsStore/selectors';
import ProjectDetailsItem from './ProjectDetailsItem';
import { Task } from '../../ts-types/projectsTypes';

const ProjectDetailsContainer: React.FC = () => {
  const [valueTask, setValueTask] = useState<string>('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    // data: { tasksList = [], projectId },
    loading,
  } = useSelector(selectItems);

  useEffect(() => {
    if (id) {
      dispatch(getAllItemsRequest(id));
    }
  }, [dispatch, id]);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValueTask(value);
  };

  const renderTask = (task: Task) => (
    <Fragment key={task.id}>
      <ProjectDetailsItem task={task} />
      <Divider />
    </Fragment>
  );

  if (loading) {
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
        >
          Add new task
        </Button>
      </Grid>

      <Grid container justify="center" spacing={3}>
        <Grid item md={6} xs={6}>
          <Paper elevation={3}>
            <Typography align="center" variant="h6">
              TODO
            </Typography>
            {/* {tasksList.length ? tasksList.map(renderTask) : <p>Tasks is empty</p>} */}
            {/* TODO: Delete mock data */}
            {[
              {
                title: 'Title2',
                id: 'k9i58ryp',
                assignedUsers: ['dmitriykulchenko@gmail.com'],
                isDone: false,
              },
              {
                title: 'Title3',
                id: 'k9i58ryp123123',
                assignedUsers: ['dmitriykulchenko@gmail.com'],
                isDone: true,
              },
              {
                title: 'Title4',
                id: 'k9i58ryp4124124',
                assignedUsers: [
                  // 'dmitriykulchenko@gmail.com',
                  'asdasdasdasd@asdasd.asdas',
                  'qwe@qwe.asd',
                  'fffff@asdsss.aasd',
                ],
                isDone: false,
              },
            ].map(renderTask)}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default ProjectDetailsContainer;
