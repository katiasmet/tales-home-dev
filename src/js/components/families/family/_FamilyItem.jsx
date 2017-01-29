import React, {PropTypes} from 'react';

import {FamilyInfo} from './';
import {Actions} from '../../';

const handleShow = () => {
  //switch show boolean
  //switch icon
  console.log(`show`);
};

const handleRemove = id => {
  console.log(`remove`);
};

const handleStartSession = () => {
  console.log(`start session`);
};

const FamilyItem = ({name, origins, homeLocation}) =>  {

  const show = false;


  const actions = [
    {
      icon: `fa-trash`,
      handleAction: handleRemove
    },
    {
      icon: `fa-close`,
      handleAction: handleShow
    },
    {
      icon: `fa-caret-right`,
      handleAction: handleStartSession
    }
  ];

  return (
    <section className='family-item'>
      <header>

        <h2>{name}</h2>

        <Actions actionClass='family-actions' actions={actions} />

      </header>

      <p>Comes from {origins} - Lives in {homeLocation}</p>

      {show && <FamilyInfo />}

    </section>
  );

};

FamilyItem.propTypes = {
  name: PropTypes.string,
  origins: PropTypes.string,
  homeLocation: PropTypes.string
};

export default FamilyItem;
