import { v4 } from 'uuid';
import * as api from '../api';
import { getIsFetching } from '../reducers';

const fetchTodosSuccess = (filter, response) => ({
  type: 'FETCH_TODOS_SUCCESS',
  filter,
  response,
});

const fetchTodosFailure = (filter, message) => ({
  type: 'FETCH_TODOS_FAILURE',
  filter,
  message,
});

export const fetchTodosRequest = (filter) => ({
  type: 'FETCH_TODOS_REQUEST',
  filter,
});

// this 'promise' action is supported becouse
// we added support for it in 'dispatch'
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch(fetchTodosRequest(filter));
  return api.fetchTodos(filter).then(
    (response) => {
      dispatch(fetchTodosSuccess(filter, response));
    },
    (error) => {
      dispatch(fetchTodosFailure(filter, `${error} !!!!!`));
    }
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
