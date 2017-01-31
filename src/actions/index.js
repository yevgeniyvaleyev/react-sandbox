import { v4 } from 'uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

export const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter,
});

// this 'promise' action is supported becouse
// we added support for it in 'dispatch'
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return;
  }
  dispatch(requestTodos(filter));
  api.fetchTodos(filter).then((response) =>
    dispatch(receiveTodos(filter, response))
  );
};

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
