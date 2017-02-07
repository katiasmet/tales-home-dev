import React, {PropTypes} from 'react';

const ModelDistanceTimelineCharacter = ({left, name, width}) => {
  const transform = `translateX(${left + (width / 2) - 2}rem)`;
  const style = {
    transform,
    WebkitTransform: transform
  };

  return (
    <li className={`timeline-character ${name}`} style={style}>
    </li>
  );
};

ModelDistanceTimelineCharacter.propTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  left: PropTypes.number
};

export default ModelDistanceTimelineCharacter;
