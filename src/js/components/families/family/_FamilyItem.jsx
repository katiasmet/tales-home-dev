import React, {PropTypes} from 'react';

import {FamilyInfo} from './';
import {Actions} from '../../';

const handleShow = () => {
  console.log(`show`);
};

const handleRemove = () => {
  console.log(`remove`);
};

const handleStartSession = () => {
  console.log(`start session`);
};

const FamilyItem = ({name, origins, homeLocation}) => {

  console.log(`family item`);

  const actions = [
    {
      icon: `fa-trash`,
      action: handleRemove
    },
    {
      icon: `fa-close`,
      action: handleShow
    },
    {
      icon: `fa-caret-right`,
      action: handleStartSession
    }
  ];

  return (
    <section className='family-item'>
      <header>

        <h2>{name}</h2>

        <Actions actionClass='family-actions' actions={actions} />

      </header>

      <p>Comes from {origins} - Lives in {homeLocation}</p>

      <FamilyInfo />

    </section>
  );
};

FamilyItem.propTypes = {
  name: PropTypes.string,
  origins: PropTypes.string,
  homeLocation: PropTypes.string
};

export default FamilyItem;
