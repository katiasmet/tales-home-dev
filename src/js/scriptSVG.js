const KUTE = require(`kute.js/kute-svg`);

const init = () => {
  console.log(`init`);
  KUTE.to(`#tentacle_left_1`, {path: `#tentacle_left_2`}).start();
};

init();
