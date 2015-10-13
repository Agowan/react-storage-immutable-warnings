import { createReducer } from 'utils';
import { Map } from 'immutable';

// normally this would be imported from /constants, but in trying to keep
// this starter kit as small as possible we'll just define it here.
const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
const initialState = new Map({count: 0});
export default createReducer(initialState, {
  [COUNTER_INCREMENT] : (state) => {
    const count = state.get('count');
    return state.set('count', count + 1);
  }
});
