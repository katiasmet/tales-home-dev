export const getUrlParameter = name => {
  name = name.replace(/[\[]/, `\\[`).replace(/[\]]/, `\\]`);
  const regex = new RegExp(`[\\?&]${  name  }=([^&#]*)`);
  console.log(window.location);
  const results = regex.exec(window.location.search);
  console.log(location);
  console.log(results);
  return results === null ? `` : decodeURIComponent(results[1].replace(/\+/g, ` `));
};

export default {
  getUrlParameter
};
