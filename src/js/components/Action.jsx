import React, {PropTypes} from 'react';

const Action = ({icon, handleAction}) => {

  return (
    <li className='action' onClick={() => handleAction()}>
        <i className={`fa ${icon}`}></i>
    </li>
  );
};

Action.propTypes = {
  icon: PropTypes.string,
  handleAction: PropTypes.func
};

export default Action;
