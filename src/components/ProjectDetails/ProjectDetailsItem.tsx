import React, { useState, useContext } from 'react';
import {
  Grid,
  Typography,
  Switch,
  makeStyles,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Input,
  useTheme,
  Theme,
  Badge,
  Button,
} from '@material-ui/core';
import { Task } from '../../ts-types/projectsTypes';
import { Users } from '../../ts-types/usersTypes';
import { AuthContext } from '../../common/FirebaseAuthProvider';

type Props = {
  task: Task;
  users: Users[];
  deleteTask: (taskId: string) => void;
  changeTaskStatus: (taskId: string, status: boolean) => void;
  assignedUser: (taskId: string, usersToAssigne: string[]) => void;
};

const useStyles = makeStyles(theme => ({
  text: {
    textDecoration: 'line-through',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const getStyles = (name: string, personName: string[], theme: Theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProjectDetailsItem: React.FC<Props> = ({
  task: { id, isDone, title, assignedUsers },
  deleteTask,
  changeTaskStatus,
  users,
  assignedUser,
}) => {
  const [switchDone, setSwitchDone] = useState<boolean>(isDone);
  const [assignedEmail, setAssignedEmail] = useState<string[]>(assignedUsers);
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const userEmail = user && user.email;

  const handleChangeSwitch = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchDone(checked);
    changeTaskStatus(id, checked);
  };

  const handleChangeSelect = ({
    target: { value },
  }: React.ChangeEvent<{ value: unknown }>) => {
    setAssignedEmail(value as string[]);
    assignedUser(id, value as string[]);
  };

  const handleDeleteTask = () => {
    deleteTask(id);
  };

  return (
    <Grid
      container
      item
      alignItems="center"
      justify="space-between"
      md={12}
      xs={12}
      direction="row"
    >
      <Switch
        checked={switchDone}
        onChange={handleChangeSwitch}
        name="checked"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <Typography className={switchDone ? classes.text : ''} component="p">
        {title}
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Assigned users</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={assignedEmail}
          onChange={handleChangeSelect}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {users.map(({ email }) => (
            <MenuItem
              key={email}
              value={email}
              style={getStyles(email, assignedEmail, theme)}
            >
              {email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {assignedEmail.includes(userEmail as string) && (
        <Badge color="secondary" variant="dot">
          <Typography>This assigned to you</Typography>
        </Badge>
      )}
      <Button variant="contained" color="secondary" onClick={handleDeleteTask}>
        Delete
      </Button>
    </Grid>
  );
};

export default React.memo(ProjectDetailsItem);
