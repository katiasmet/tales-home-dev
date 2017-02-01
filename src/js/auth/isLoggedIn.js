import token from './token';

export default () => {

  if (!token.isValid() || !token.content()) {
    return ``;
  }

  return token.content().scope;

};
