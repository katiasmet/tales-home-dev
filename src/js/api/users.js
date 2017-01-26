import fetch from 'isomorphic-fetch';

import {checkStatus, buildBody} from '../util/';
import {token} from '../auth/';

const base = `/api/users`;

const whitelist = {
  POST: [`name`, `email`, `password`, `organisation`]
};

export const select = id => {

  const headers = new Headers({Authorization: token.get()});
  let path;

  if (id) { path = `${base}/${id}`; }
  else { path = base; }

  return fetch(path, {headers})
    .then(checkStatus);

};

export const insert = data => {

  const method = `POST`;
  const body = buildBody(data, whitelist.POST, {});

  return fetch(base, {method, body})
    .then(checkStatus);

};

export default {
  insert,
  select
};
