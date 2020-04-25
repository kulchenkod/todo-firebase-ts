import { combineReducers } from 'redux';
import { reducer as authReducer } from '../stores/authStore';

const rootReducer = combineReducers({
  authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
