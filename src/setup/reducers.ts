import { combineReducers } from 'redux';
import { reducer as authReducer } from '../stores/authStore';
import { reducer as projectsReducer } from '../stores/projectsStore';
import { reducer as tasksReducer } from '../stores/projectItemsStore';

const rootReducer = combineReducers({
  authReducer,
  projectsReducer,
  tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
