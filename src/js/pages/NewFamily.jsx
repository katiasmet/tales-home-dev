import React from 'react';

import {Header} from '../components/';
import {FamilyAdd} from '../components/mentor/family';

const NewFamily = () => {
  return (
    <div className='page page-new-family'>
      <Header />

      <main>
        <FamilyAdd />
      </main>
    </div>

  );
};

export default NewFamily;
