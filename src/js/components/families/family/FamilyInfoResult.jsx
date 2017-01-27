import React from 'react';

import {Actions} from '../../';

const handleRemove = () => {
  console.log(`remove`);
};

const handleNotes = () => {
  console.log(`notes`);
};

const handleDownload = () => {
  console.log(`download`);
};


const FamilyInfoResult = () => {

  const actions = [
    {
      icon: `fa-trash`,
      handleAction: handleRemove
    },
    {
      icon: `fa-align-justify`,
      handleAction: handleNotes
    },
    {
      icon: `fa-download`,
      handleAction: handleDownload
    }
  ];

  return (
    <li className='family-info-result'>
      name
      <span className='result-date'> - 20 April 2017</span>

      <Actions actionClass='result-actions' actions={actions} />
    </li>
  );
};

export default FamilyInfoResult;
