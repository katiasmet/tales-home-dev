import fetch from 'isomorphic-fetch';

import {token} from '../auth/';
import {checkStatus, buildQuery, buildBody} from '../util/';

const base = `/api/notes`;

const whitelist = {
  GET: [`familyModelId`],
  POST: [`familyModelId`, `notes`],
  PUT: [`notes`],
  DELETE: [`id`]
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

export const selectByProfessional = query => {
  const method = `GET`;
  const qs = buildQuery(query, whitelist.GET);
  if (!qs) return select();
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});

  return fetch(`${base}?${qs}`, {method, headers})
    .then(checkStatus);
};

export const insert = data => {

  console.log(data);

  const method = `POST`;
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});
  const body = buildBody(data, whitelist.POST, {});

  return fetch(base, {method, body, headers})
    .then(checkStatus);

};

export const update = (data, id) => {

  const method = `PUT`;
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});
  const body = buildBody(data, whitelist.PUT, {});

  return fetch(`${base}/${id}`, {method, body, headers})
    .then(checkStatus);

};

export const remove = id => {

  const method = `DELETE`;
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});

  return fetch(`${base}/${id}`, {method, headers})
    .then(checkStatus);

};

export default {
  insert,
  select,
  selectByProfessional,
  remove
};
