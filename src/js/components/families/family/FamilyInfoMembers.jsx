import React from 'react';
import {inject, observer} from 'mobx-react';

import {FamilyInfoMember} from './';

const FamilyInfoMembers = inject(`families`)(observer(({families}) => {

  const {activeFamily} = families;

  return (
    <section className='family-info-members'>
      <h3>Family members</h3>

      <ul>

        {
          activeFamily.familymembers.slice().map((familymember, i) => {
            return <FamilyInfoMember key={i} {...familymember} />;
          })
        }

      </ul>

    </section>
  );
}));

export default FamilyInfoMembers;
