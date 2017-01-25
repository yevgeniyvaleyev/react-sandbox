import { v4 } from 'uuid';
import * as api from '../api';

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

// this 'promise' action is supported becouse
// we added support for it in 'dispatch'
export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then((response) =>
    receiveTodos(filter, response)
  );

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
