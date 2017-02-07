import React from 'react';

// Displays an error about fetching and
// gives action to retry
const FetchError = ({ message, onRetry }) => (
  <div>
    <p>Can't fetch todos. {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);
FetchError.propTypes = {
  message: React.PropTypes.string.isRequired,
  onRetry: React.PropTypes.func.isRequired,
};


export default FetchError;
