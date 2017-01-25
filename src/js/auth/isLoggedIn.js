import token from './token';

export default () => {

  if (!token.isValid() || !token.content()) {
    return false;
  }

  return true;

};
