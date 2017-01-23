import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { withRouter } from 'react-router';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};

// second argument is own properties which contains params
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(
    state.todos,
    params.filter || 'all'
  ),
});

// Defined a map which defines that when 'onTodoClick'
// will be called it will trigger dispatch with 'toggleTodo' actions
// prividing arguments which are passed to 'onTodoClick'
const mapDispatchToProps = { onTodoClick: toggleTodo };

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;
