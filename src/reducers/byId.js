const byId = (state = {}, action) => {
  // having normalized response the structure will be the same
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    };
  }
  return state;
};

export default byId;

export const getTodo = (state, id) => state[id];
