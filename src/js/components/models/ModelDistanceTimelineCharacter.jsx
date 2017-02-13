import React, {PropTypes} from 'react';

const ModelDistanceTimelineCharacter = ({firstname, left, name, width, onboarding}) => {
  let transform = `translateX(${left}rem)`;
  const fixedWidth = `${width}rem`;

  let opacity = 0;
  if (left !== 0 || onboarding) opacity = 1;
  if (onboarding) transform = `translateX(20rem)`;

  const style = {
    width: fixedWidth,
    opacity,
    transform,
    WebkitTransform: transform
  };

  return (
    <li className={`timeline-character ${name}`} style={style}>
      <span className='member-bullet'></span>
      <span className='member-name'>{firstname}</span>
    </li>
  );
};

ModelDistanceTimelineCharacter.propTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  left: PropTypes.number,
  firstname: PropTypes.string,
  onboarding: PropTypes.bool
};

export default ModelDistanceTimelineCharacter;
