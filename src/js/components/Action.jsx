import React from 'react';

const Action = (icon, handleAction) => {
  return (
    <li className='action' onClick={handleAction}>
        <i className={`fa ${icon}`}></i>
    </li>
  );
};

export default Action;
