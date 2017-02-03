import React, {PropTypes} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {token} from '../../auth';
import {FamilyMembers} from './';

const FamilyOverview = inject(`families`)(observer(({families}) => {

  const {activeFamily, handleStartSession} = families;
  const {familymembers, overviewVisites} = activeFamily;

  const name = token.content().name;

  if (!isEmpty(familymembers) && overviewVisites === 1) handleStartSession();

  return (
    <section className='family-overview'>

      {
        (!isEmpty(familymembers) && overviewVisites === 1) && (<Redirect to='/models' />)
      }

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
