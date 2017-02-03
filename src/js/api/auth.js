import fetch from 'isomorphic-fetch';

import {checkStatus, buildBody} from '../util/';
import {audience} from '../globals';

const whitelist = {
  POST: [`email`, `password`],
  POST_FAMILY: [`familyId`]
};

export const login = data => {

  const body = buildBody(data, whitelist.POST, {audience});
  const method = `POST`;

  return fetch(`/api/auth`, {body, method})
    .then(checkStatus)
    .then(({token}) => token);

};

export const familyLogin = data => {

  const body = buildBody(data, whitelist.POST_FAMILY, {audience});
  const method = `POST`;

  return fetch(`/api/authfamily`, {body, method})
    .then(checkStatus)
    .then(({token}) => token);

};

export default {
  login,
  familyLogin
};
