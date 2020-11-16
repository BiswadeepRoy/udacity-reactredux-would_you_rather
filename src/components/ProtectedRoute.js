import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={function (props) {
      return (
        rest.authedUser
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
    } />
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(ProtectedRoute));