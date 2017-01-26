import fetch from 'isomorphic-fetch';

import {token} from '../auth/';
import {checkStatus, buildQuery, buildBody} from '../util/';

const base = `/api/families`;

const whitelist = {
  GET: [`professionalId`],
  POST: [`name`, `origins`, `homeLocation`]
};

export const select = id => {

  const headers = new Headers({Authorization: `Bearer ${token.get()}`});
  let path;

  if (id) { path = `${base}/${id}`; }
  else { path = base; }

  return fetch(path, {headers})
    .then(checkStatus);

};

export const selectByProfessionalId = query => {

  const qs = buildQuery(query, whitelist.GET);
  if (!qs) return select();
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});

  return fetch(`${base}?${qs}`, {headers})
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
  select,
  selectByProfessionalId
};
