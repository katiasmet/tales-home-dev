export default x => {
  const snappedX = Math.round(x / 10) * 10;
  return snappedX;
};
