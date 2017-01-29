import React from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FamilyInfoResult} from './';

const FamilyInfoResults = inject(`families`)(observer(({families}) => {

  const {activeFamily, infoMessage} = families;

  return (
    <section className='family-info-results'>
      <h3>Results</h3>

      <ul>

        {
          (isEmpty(activeFamily.familymodels)) ? (<li>{infoMessage.models}</li>)
          : (activeFamily.familymodels.slice().map((familymodel, i) => {
            return <FamilyInfoResult key={i} {...familymodel} />;
          }))
        }

      </ul>

    </section>
  );
}));

export default FamilyInfoResults;
