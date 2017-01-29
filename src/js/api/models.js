import fetch from 'isomorphic-fetch';

import {token} from '../auth/';
import {checkStatus} from '../util/';

const base = `/api/models`;

export const select = id => {

  const method = `GET`;
  const headers = new Headers({Authorization: `Bearer ${token.get()}`});
  let path;

  if (id) { path = `${base}/${id}`; }
  else { path = base; }

  return fetch(path, {method, headers})
    .then(checkStatus);

};

export default {
  select
};
