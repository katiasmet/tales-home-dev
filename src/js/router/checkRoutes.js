import React, {PropTypes} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {isLoggedIn} from '../auth';

export const MatchWhenAuthorized = ({component, ...rest}) => (

  <Route {...rest} render={props => (
    isLoggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: `/login`,
        state: {from: props.location}
      }} />
    )
  )} />
);

export const RedirectWhenAuthorized = ({component, ...rest}) => (

  <Route {...rest} render={props => (
    isLoggedIn() ? (
      <Redirect to={{
        pathname: `/families`,
        state: {from: props.location}
      }} />
    ) : (
      React.createElement(component, props)
    )
  )} />
);


MatchWhenAuthorized.propTypes = {
  component: PropTypes.func,
  location: PropTypes.func
};

RedirectWhenAuthorized.propTypes = {
  component: PropTypes.func,
  location: PropTypes.func
};

export default {
  MatchWhenAuthorized,
  RedirectWhenAuthorized
};
