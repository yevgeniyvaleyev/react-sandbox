import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
});

export default todoApp;

// abstraction layer for an actual filter for mapping properties
export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
