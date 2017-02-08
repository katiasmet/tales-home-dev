import React, {PropTypes} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FamilyMember} from './';

const FamilyMembers = inject(`families`)(observer(({families}) => {

  const {activeFamily, handleStartSession} = families;
  const {familymembers, overviewVisites} = activeFamily;

  if (!isEmpty(familymembers) && overviewVisites === 1) handleStartSession();

  return (
    <section className='family-members'>

      {
        (!isEmpty(familymembers) && overviewVisites === 1) && (<Redirect to='/models' />)
      }

      {

        (isEmpty(familymembers)) ? <Link to='newfamilymember'><i className='fa fa-plus'></i></Link>
        : handleFamilyMembers(familymembers)

      }

    </section>
  );
}));

const handleFamilyMembers = familymembers => {
  return familymembers.slice().map((familymember, i) => {
    return <FamilyMember {...familymember} key={i} />;
  });
};

FamilyMembers.propTypes = {
  families: PropTypes.shape({
    activeFamily: PropTypes.object
  })
};

export default FamilyMembers;
