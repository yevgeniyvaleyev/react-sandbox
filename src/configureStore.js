import { createStore } from 'redux';
import todoApp from './reducers';

const promise = (store) => (next) => (action) => { // eslint-disable-line no-unused-vars
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

// here we set all middlewares with store and dispatch
// it's used to chain middelwares to execute on by one with preset context
// Middelwares use curry so curryed function (which accept action) has own next (old dispatch)
// and store predefined.
const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.forEach((middleware) => {
    store.dispatch = middleware(store)(store.dispatch); // eslint-disable-line no-param-reassign
  });
};

const logger = (store) => (next) => {
  /* eslint-disable no-console */
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
};

const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  middlewares.push(promise);

  wrapDispatchWithMiddlewares(store, middlewares);
  return store;
};

export default configureStore;
