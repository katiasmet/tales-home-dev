import {pick, assign, isArray} from 'lodash';

export default (data, values, extend) => {

  data = pick(data, values);

  if (extend) {
    data = assign(data, extend);
  }

  const fd = new FormData();
  for (const key in data) {
    if (isArray(data[key])) fd.append(key, JSON.stringify(data[key]));
    else fd.append(key, data[key]);
  }

  return fd;

};
