export default response => {
  const json = response.json();
  if (response.ok) return json;
  else return json.then(Promise.reject.bind(Promise));
};
