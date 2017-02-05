import React, {PropTypes} from 'react';

const ModelDistanceTimelineCharacter = ({left, name}) => {
  const transform = `translateX(${left / 10}rem)`;
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
  left: PropTypes.number
};

export default ModelDistanceTimelineCharacter;
