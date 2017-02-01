import fetch from 'isomorphic-fetch';

import {checkStatus} from '../util/';

const base = `../../assets/data/languages.json`;

export const select = () => {

  const method = `GET`;

  return fetch(base, {method})
    .then(checkStatus);

};

export default {
  select
};
