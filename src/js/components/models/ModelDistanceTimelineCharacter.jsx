import React, {PropTypes} from 'react';

const ModelDistanceTimelineCharacter = ({firstname, left, name, width, onboarding}) => {
  let transform = `translateX(${left}%)`;
  const fixedWidth = `${width / 10}rem`;

  let opacity = 0;
  if (left !== 0 || onboarding) opacity = 1;
  if (onboarding) transform = `translateX(20rem)`;

  const style = {
    width: fixedWidth,
    opacity
  };

  const transformStyle = {
    transform,
    WebkitTransform: transform
  };

  return (
    <li className='timeline-character-wrapper' style={transformStyle}>
      <span className={`timeline-character ${name}`} style={style}>
        <span className='member-bullet'></span>
        <span className='member-name'>{firstname}</span>
      </span>
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
