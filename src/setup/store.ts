import {
  applyMiddleware,
  createStore,
  Middleware,
  Store,
  StoreEnhancer,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import promiseListener from './promiseListener';
import rootReducer, { RootState } from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  return composeWithDevTools(applyMiddleware(...middleware));
};

const store: Store<RootState> = createStore(
  rootReducer,
  bindMiddleware([promiseListener.middleware, sagaMiddleware]),
);

sagaMiddleware.run(rootSaga);

export default store;
