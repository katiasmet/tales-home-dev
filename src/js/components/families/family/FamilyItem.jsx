import React, {PropTypes} from 'react';

import {FamilyInfo} from './';
import {Actions} from '../../';


const FamilyItem = ({name, origins, homeLocation}) => {

  console.log(`family item`);

  return (
    <section className='family-item'>
      <header>

        <h2>{name}</h2>

      </header>

      <p>Comes from {origins} - Lives in {homeLocation}</p>

      <FamilyInfo />
    </section>
  );
};


export default FamilyItem;
