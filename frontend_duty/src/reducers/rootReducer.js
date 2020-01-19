import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import { LOG_OUT_SUCCESS } from '../actions/constants';

// GLOBAL REDUCERS
import authReducer from './authReducer';
import ranksReducer from './ranksReducer';
import platoonsReducer from './platoonsReducer';
import eventsReducer from './eventsReducer';
import personnelsReducer from './personnelsReducer';
import pointsReducer from './pointsReducer';
import statusesReducer from './statusesReducer';
import pagesReducer from './pagesReducer';

const appReducer = combineReducers({
  auth: authReducer,
  ranks: ranksReducer,
  platoons: platoonsReducer,
  events: eventsReducer,
  personnels: personnelsReducer,
  points: pointsReducer,
  statuses: statusesReducer,
  pages: pagesReducer
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOG_OUT_SUCCESS) {
    newState = undefined;
  }
  return appReducer(newState, action);
};

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['pages']
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export default persistedRootReducer;
