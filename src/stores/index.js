import { compose, createStore, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';
import rootReducer from 'reducers';
import createLogger from 'redux-logger';
import storage      from 'redux-storage';
import createEngine from 'redux-storage/engines/localStorage';

let createStoreWithMiddleware;

let engine = createEngine('storage-key');
engine = storage.decorators.immutablejs(engine, [
  ['counter']
]);
const storageMiddleware = storage.createMiddleware(engine);

const logger = createLogger();

if (__DEBUG__) {
  createStoreWithMiddleware = compose(applyMiddleware(storageMiddleware, logger), devTools())(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(storageMiddleware)(createStore);
}

export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }

  const load = storage.createLoader(engine);
  load(store)
    .then((newState) => window.console.log('Loaded state:', newState))
    .catch(() => window.console.log('Failed to load previous state'));

  return store;
}
