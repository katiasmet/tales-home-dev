import React from 'react';

import {Header} from '../components/';
import {FamilyMemberAdd} from '../components/family/';

const NewFamilyMember = () => {

  return (
    <div className='page page-new-family-member'>
      <Header />

      <main>
        <h1>Add a new family member</h1>
        <FamilyMemberAdd />
      </main>
    </div>

  );
};


export default NewFamilyMember;
