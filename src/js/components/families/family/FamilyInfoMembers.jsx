import React from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FamilyInfoMember} from './';

const FamilyInfoMembers = inject(`families`)(observer(({families}) => {

  const {activeFamily, infoMessage} = families;

  return (
    <section className='family-info-members'>
      <h3>Family members</h3>

      <ul>

        {
          (isEmpty(activeFamily.familymembers)) ? (<li>{infoMessage.members}</li>)
          : (activeFamily.familymembers.slice().map((familymember, i) => {
            return <FamilyInfoMember key={i} {...familymember} />;
          }))
        }

      </ul>

    </section>
  );
}));

export default FamilyInfoMembers;
