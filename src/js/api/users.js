import fetch from 'isomorphic-fetch';

import {audience} from '../globals';
import {checkStatus, buildBody} from '../util/';
import {token} from '../auth/';

const base = `/api/users`;

const whitelist = {
  POST: [`name`, `email`, `password`, `organisation`],
  UPDATE: [`name`, `email`, `password`, `newpassword`, `organisation`],
  PUT: [`firstLogin`]
};

export const select = id => {

  const method = `GET`;
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});
  let path;

  if (id) { path = `${base}/${id}`; }
  else { path = base; }

  return fetch(path, {method, headers})
    .then(checkStatus);

};

export const insert = data => {

  const method = `POST`;
  const body = buildBody(data, whitelist.POST, {});

  return fetch(base, {method, body})
    .then(checkStatus);

};

export const update = data => {

  const method = `POST`; //post instead of put to hash the passwords
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});
  const body = buildBody(data, whitelist.UPDATE, {audience});
  const id = token.content().sub;

  return fetch(`${base}/${id}`, {method, headers, body})
    .then(checkStatus);
};

export const updateLogin = data => {

  const method = `PUT`;
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});
  const body = buildBody(data, whitelist.PUT);
  const id = token.content().sub;

  return fetch(`${base}/${id}`, {method, headers, body})
    .then(checkStatus);
};

export default {
  insert,
  select,
  update,
  updateLogin
};
