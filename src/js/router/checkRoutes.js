import React, {PropTypes} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isEmpty} from 'lodash';

import {isLoggedIn} from '../auth';

export const MatchWhenAuthorized = ({component, ...rest}) => (

  <Route {...rest} render={props => (
    (isLoggedIn() === `professional`) ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: `/login`,
        state: {from: props.location}
      }} />
    )
  )} />
);

export const MatchWhenFamily = ({component, ...rest}) => (

  <Route {...rest} render={props => (
    (isLoggedIn() === `family`) ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: `/login`,
        state: {from: props.location}
      }} />
    )
  )} />
);


const redirectPath = () => {
  if (isLoggedIn() === `professional`) return `/families`;
  else return `/family`;
};

export const RedirectWhenAuthorized = ({component, ...rest}) => (

  <Route {...rest} render={props => (
    (!isEmpty(isLoggedIn())) ? (
      <Redirect to={{
        pathname: redirectPath(),
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

MatchWhenFamily.propTypes = {
  component: PropTypes.func,
  location: PropTypes.func
};

RedirectWhenAuthorized.propTypes = {
  component: PropTypes.func,
  location: PropTypes.func
};

export default {
  MatchWhenAuthorized,
  MatchWhenFamily,
  RedirectWhenAuthorized
};
