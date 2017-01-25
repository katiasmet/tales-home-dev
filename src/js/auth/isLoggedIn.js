import token from './token';

export default (nextState, replace) => {

  if (!token.isValid() || !token.content()) {
    replace({pathname: `/login`});
    return false;
  }

  return true;

};
