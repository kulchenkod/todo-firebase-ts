import { combineReducers } from 'redux';
import { reducer as authReducer } from '../stores/authStore';
import { reducer as projectsReducer } from '../stores/projectsStore';
import { reducer as tasksReducer } from '../stores/projectItemsStore';
import { reducer as usersReducer } from '../stores/usersStore';

const rootReducer = combineReducers({
  authReducer,
  projectsReducer,
  usersReducer,
  tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
