import { combineReducers, createStore } from 'redux';
import gameReducer from './reducers/gameReducer';

const rootReducer = combineReducers({
  gameReducer,
});

const store = createStore(rootReducer, window?.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
