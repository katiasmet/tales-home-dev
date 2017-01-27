import React from 'react';

import {FamilyInfoMembers, FamilyInfoResults} from './';

const FamilyInfo = () => {
  return (
    <section className='family-info'>
      <FamilyInfoMembers />
      <FamilyInfoResults />
    </section>
  );
};

export default FamilyInfo;
