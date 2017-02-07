import { combineReducers } from 'redux';

const createList = (filter) => {
  const ids = (state = [], action) => {
    const shouldRemoveTodo = (id) => {
      const { completed } = action.response.entities.todos[id];
      return (completed && filter === 'active') ||
        (!completed && filter === 'completed');
    };

    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return (action.filter === filter) ?
          action.response.result :
          state;
          // taken directly since normalizr is used and array of ids in results
      case 'ADD_TODO_SUCCESS':
      // taken directly from result (normalizr)
        return (action.filter === 'completed') ?
          state :
          [...state, action.response.result];
      case 'TOGGLE_TODO_SUCCESS':
        const id = action.response.result;
        return shouldRemoveTodo(id) ?
          state.filter((_id) => _id !== id) :
          state;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

export const getIds = (state) => state.ids;

export const getIsFetching = (state) => state.isFetching;

export const getErrorMessage = (state) => state.errorMessage;
