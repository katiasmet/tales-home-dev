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
      action: handleRemove
    },
    {
      icon: `fa-notes`,
      action: handleNotes
    },
    {
      icon: `fa-download`,
      action: handleDownload
    }
  ];

  return (
    <li className='family-info-result'>
      name

      <span className='result-date'>
        20 April 2017
      </span>

    </li>
  );
};

export default FamilyInfoResult;
