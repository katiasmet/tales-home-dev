import React from 'react';

import {FamilyInfoMember} from './';

const FamilyInfoMembers = () => {
  return (
    <section className='family-info-members'>
      <h3>Family members</h3>

      <ul>
        <FamilyInfoMember />
      </ul>

    </section>
  );
};

export default FamilyInfoMembers;
