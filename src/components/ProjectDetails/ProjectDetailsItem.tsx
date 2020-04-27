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
} from '@material-ui/core';
import { Task } from '../../ts-types/projectsTypes';
import { AuthContext } from '../../common/FirebaseAuthProvider';

type Props = {
  task: Task;
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
  };

  const handleChangeSelect = ({
    target: { value },
  }: React.ChangeEvent<{ value: unknown }>) => {
    setAssignedEmail(value as string[]);
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
          {/* Users collections */}
          {[
            'dmitriykulchenko@gmail.com',
            'asdasdasdasd@asdasd.asdas',
            'qwe@qwe.asd',
            'fffff@asdsss.aasd',
            'asdasasdasdasd',
            'asdas3123123@qwqweqw.qweqwe',
            '45125125@wqeqweqwe',
          ].map(email => (
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
    </Grid>
  );
};

export default React.memo(ProjectDetailsItem);
