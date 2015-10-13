import { combineReducers } from 'redux';
import storage             from 'redux-storage';
import counter             from './counter';

const rootReducer = combineReducers({
  counter
});

export default storage.reducer(rootReducer);
