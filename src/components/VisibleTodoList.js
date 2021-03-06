import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoList from './TodoList';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import { withRouter } from 'react-router';
import FetchError from './FetchError';

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter).then(() => console.log('done'));
  }

  render() {
    // I don't want to pass fetchTodos to the component
    // so I extract it
    const {
      fetchTodos, // eslint-disable-line no-unused-vars
      todos,
      errorMessage,
      isFetching,
      ...rest } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    // renders an error component
    // if fetching had a problem
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }
    return (
      <TodoList
        todos={todos}
        {...rest}
      />
    );
  }
}
VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  fetchTodos: PropTypes.func.isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

// second argument is own properties which contains params
// full state is provided to filter abstraction wrapper
const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';

  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
};

// Defined a map which defines that when 'onTodoClick'
// will be called it will trigger dispatch with 'toggleTodo' actions
// prividing arguments which are passed to 'onTodoClick'
const mapDispatchToProps = {
  onTodoClick: actions.toggleTodo,
  fetchTodos: actions.fetchTodos,
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList));

export default VisibleTodoList;
