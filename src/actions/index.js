import * as api from '../api';
import { getIsFetching } from '../reducers';
import { normalize } from 'normalizr';
import * as shema from './shema';

const fetchTodosSuccess = (filter, response) => ({
  type: 'FETCH_TODOS_SUCCESS',
  filter,
  response: normalize(response, shema.arrayOfTodos),
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

const addTodoSuccess = (response) => ({
  type: 'ADD_TODO_SUCCESS',
  response: normalize(response, shema.todo),
});

const addTodoFailure = (message) => ({
  type: 'ADD_TODO_FAILURE',
  message,
});

// this 'promise' action is supported becouse
// we added support for it in 'dispatch'
// using thunk
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
      const message = error.message || 'Something went wrong!';
      dispatch(fetchTodosFailure(filter, `${message} !!!!!`));
    }
  );
};

export const addTodo = (text) => (dispatch) => {
  api.addTodo(text).then(
    (response) => {
      dispatch(addTodoSuccess(response));
    },
    (error) => {
      const message = error.message || 'Something went wrong!';
      dispatch(addTodoFailure(`[Adding] ${message} !!!!!`));
    });
};

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
