import React, {PropTypes} from 'react';

const Action = ({_id, icon, handleAction}) => {

  return (
    <li className='action' onClick={() => handleAction(_id)}>
        <i className={`fa ${icon}`}></i>
    </li>
  );
};

Action.propTypes = {
  _id: PropTypes.string,
  icon: PropTypes.string,
  handleAction: PropTypes.func
};

export default Action;
