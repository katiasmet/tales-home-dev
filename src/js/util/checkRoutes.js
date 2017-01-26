import React, {PropTypes} from 'react';
import {Match, Redirect} from 'react-router';

import {isLoggedIn} from '../auth';

export const MatchWhenAuthorized = ({component: Component, ...rest}) => (

  <Match {...rest} exactly render={props => (
    isLoggedIn() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: `/login`
      }} />
    )
  )} />
);

export const RedirectWhenAuthorized = ({component: Component, ...rest}) => (
  <Match {...rest} exactly render={props => (
    isLoggedIn() ? (
      <Redirect to={{
        pathname: `/families`
      }} />
    ) : (
      <Component {...props} />
    )
  )} />
);

MatchWhenAuthorized.propTypes = {
  component: PropTypes.func
};

RedirectWhenAuthorized.propTypes = {
  component: PropTypes.func
};

export default {
  MatchWhenAuthorized,
  RedirectWhenAuthorized
};
