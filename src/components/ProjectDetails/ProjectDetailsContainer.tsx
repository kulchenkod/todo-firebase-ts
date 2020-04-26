import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CircularProgress,
  Grid,
  TextField,
  Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
} from '@material-ui/core';
import { useParams } from 'react-router';
import { getAllItemsRequest } from '../../stores/projectItemsStore/actions';
import { selectItems } from '../../stores/projectItemsStore/selectors';

const ProjectDetailsContainer: React.FC = () => {
  const [valueTask, setValueTask] = useState<string>('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: { tasksList = [] },
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <TextField
        value={valueTask}
        type="text"
        label="Task name"
        onChange={handleChange}
      />
      <Button disabled={!valueTask?.length} variant="contained" color="primary">
        Add new task
      </Button>
      <Grid container spacing={3}>
        {tasksList.length ? (
          tasksList.map(item => <h1>{item.title}</h1>)
        ) : (
          <p>Tasks is empty</p>
        )}
      </Grid>
    </>
  );
};
export default ProjectDetailsContainer;
