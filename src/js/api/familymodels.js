import fetch from 'isomorphic-fetch';
import {isEmpty} from 'lodash';

import {token} from '../auth/';
import {checkStatus, buildQuery, buildBody} from '../util/';

const base = `/api/familymodels`;

const whitelist = {
  GET: [`familyId`],
  POST: [`familyId`, `modelId`],
  DELETE: [`id`, `familyId`]
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

export const selectByFamily = query => {

  const method = `GET`;
  const qs = buildQuery(query, whitelist.GET);
  if (!qs) return select();
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});

  return fetch(`${base}?${qs}`, {method, headers})
    .then(checkStatus);

};

export const insert = data => {

  const method = `POST`;
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});
  const body = buildBody(data, whitelist.POST, {});

  return fetch(base, {method, body, headers})
    .then(checkStatus);

};

export const remove = query => {

  const method = `DELETE`;

  let qs, id;
  if (query.familyId) qs = buildQuery(query, whitelist.GET);
  else id = query.id;
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});

  let path;
  if (isEmpty(id)) path = `${base}?${qs}`;
  else path = `${base}/${id}`;

  return fetch(path, {method, headers})
    .then(checkStatus);

};

export default {
  insert,
  select,
  selectByFamily,
  remove
};
