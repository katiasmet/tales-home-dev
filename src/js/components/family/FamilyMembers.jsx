import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {FamilyMember} from './';

const FamilyMembers = inject(`families`)(observer(({families}) => {

  const {activeFamily} = families;
  const {familymembers} = activeFamily;

  return (
    <section className='family-members'>
      {
        familymembers.slice().map((familymember, i) => {
          return <FamilyMember {...familymember} key={i} />;
        })
      }
    </section>
  );
}));

FamilyMembers.propTypes = {
  families: PropTypes.shape({
    activeFamily: PropTypes.object
  })
};

export default FamilyMembers;
