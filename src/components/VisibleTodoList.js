import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoList from './TodoList';
import { getVisibleTodos } from '../reducers';
import { withRouter } from 'react-router';
import { fetchTodos } from '../api';

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
    const { filter, receiveTodos } = this.props;

    fetchTodos(filter).then((todos) => {
      receiveTodos(filter, todos);
    });
  }

  render() {
    return (
      <TodoList
        {...this.props}
      />
    );
  }
}
VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  receiveTodos: PropTypes.func.isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

// second argument is own properties which contains params
// full state is provided to filter abstraction wrapper
const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';

  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

// Defined a map which defines that when 'onTodoClick'
// will be called it will trigger dispatch with 'toggleTodo' actions
// prividing arguments which are passed to 'onTodoClick'
const mapDispatchToProps = {
  onTodoClick: actions.toggleTodo,
  receiveTodos: actions.receiveTodos,
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList));

export default VisibleTodoList;
