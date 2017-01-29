import React from 'react';
import {inject, observer} from 'mobx-react';

import {FamilyInfoResult} from './';

const FamilyInfoResults = inject(`families`)(observer(({families}) => {

  const {activeFamily} = families;

  return (
    <section className='family-info-results'>
      <h3>Results</h3>

      <ul>

        {
          activeFamily.familymodels.slice().map((familymodel, i) => {
            return <FamilyInfoResult key={i} {...familymodel} />;
          })
        }


      </ul>

    </section>
  );
}));

/*

{
  activeFamily.familymodels.slice().map((familymodel, i) => {
    return <FamilyInfoResult key={i} {...familymodel} />;
  })
}

*/

export default FamilyInfoResults;
