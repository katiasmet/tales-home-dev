import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header} from '../components/';
import {FamilyMemberAdd} from '../components/family/';

const NewFamilyMember = inject(`languages`)(observer(({languages}) => {

  const {allLanguages, getLanguages} = languages;
  if (isEmpty(allLanguages)) getLanguages();

  return (
    <div className='page page-new-family-member'>
      <Header />

      <main>
        <h1>Add a new family member</h1>
        <FamilyMemberAdd />
      </main>
    </div>

  );
}));

NewFamilyMember.propTypes = {
  languages: PropTypes.shape({
    allLanguages: PropTypes.array,
    getLanguages: PropTypes.func
  })
};

export default NewFamilyMember;
