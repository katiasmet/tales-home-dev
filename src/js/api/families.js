import fetch from 'isomorphic-fetch';

import {token} from '../auth/';
import {checkStatus, buildQuery, buildBody} from '../util/';

const base = `/api/families`;

const whitelist = {
  GET: [`professionalId`],
  POST: [`name`, `origins`, `homeLocation`],
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

export const selectByProfessionalId = query => {

  const method = `GET`;
  const qs = buildQuery(query, whitelist.GET);
  if (!qs) return select();
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});

  return fetch(`${base}?${qs}`, {method, headers})
    .then(checkStatus);

};

export const insert = data => {

  const method = `POST`;
  const body = buildBody(data, whitelist.POST, {});

  return fetch(base, {method, body})
    .then(checkStatus);

};

export const remove = query => {

  const method = `DELETE`;
  const qs = buildQuery(query, whitelist.DELETE);
  if (!qs) return select();
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});

  return fetch(`${base}?${qs}`, {method, headers})
    .then(checkStatus);

};

export default {
  insert,
  select,
  selectByProfessionalId,
  remove
};
