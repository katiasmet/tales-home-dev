import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {token} from '../../auth';
import {FamilyMembers} from './';

const FamilyOverview = inject(`families`)(observer(({families}) => {

  const {activeFamily} = families;
  const {familymembers} = activeFamily;

  const name = token.content().name;


  return (
    <section className='family-overview'>

      {

        (isEmpty(familymembers)) ? <Link to='newfamilymember'><i className='fa fa-plus'></i></Link>
        : <FamilyMembers />

      }

      <footer>
        <h1>The {name}&#39;s</h1>
      </footer>
    </section>
  );
}));

FamilyOverview.propTypes = {
  families: PropTypes.shape({
    activeFamily: PropTypes.object
  })
};

export default FamilyOverview;
