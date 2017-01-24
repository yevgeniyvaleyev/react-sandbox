import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { getVisibleTodos } from '../reducers';
import { withRouter } from 'react-router';

// second argument is own properties which contains params
// full state is provided to filter abstraction wrapper
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all'),
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
