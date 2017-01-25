import token from './token';

export default (nextState, replace) => {

  if (token.clear()) {
    replace({pathname: `/login`});
  }

};
