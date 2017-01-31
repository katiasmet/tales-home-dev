import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FamilyInfoResult} from './';

const FamilyInfoResults = inject(`families`)(observer(({families}) => {

  const {activeFamily, infoMessage} = families;
  const {familymodels} = activeFamily;

  return (
    <section className='family-info-results'>
      <h3>Results</h3>

      <ul>

        {
          (isEmpty(familymodels)) ? (<li>{infoMessage.models}</li>)
          : (familymodels.slice().map((familymodel, i) => {
            return <FamilyInfoResult key={i} {...familymodel} />;
          }))
        }

      </ul>

    </section>
  );
}));

FamilyInfoResults.propTypes = {
  families: PropTypes.shape({
    activeFamily: PropTypes.array,
    infoMessage: PropTypes.string
  })
};

export default FamilyInfoResults;
