import fetch from 'isomorphic-fetch';

import {checkStatus, buildBody} from '../util/';
import {audience} from '../globals';
const base = `/api/auth`;

const whitelist = {
  POST: [`email`, `password`]
};

export const login = data => {

  const body = buildBody(data, whitelist.POST, {audience});
  const method = `POST`;

  return fetch(base, {body, method})
    .then(checkStatus)
    .then(({token}) => token);

};

export default {
  login
};
