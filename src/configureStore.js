import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';

// - Here I use applyMiddleware which applies middlewares providing store and
// previous dispatch to curried function;
// 3rd party promise and logger middlewares are used which provide
// curried function (with store, dispatch)
const configureStore = () => {
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  middlewares.push(promise);

  // second agrument can be persistedState if needed
  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
