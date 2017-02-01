import React from 'react';
import {inject, observer} from 'mobx-react';

import {Languages} from '../';
import {FamilyMemberAddLanguage} from './';

const FamilyMemberAddLanguages = inject(`languages`)(observer(({languages}) => {

  const {handleShowLanguages, showDropDown, selectedLanguages} = languages;

  return (
    <section className='form-roles'>

      <header>
        <h3 className='label'>What languages do you speak?</h3>
        <a className='btn' onClick={handleShowLanguages}><i className='fa fa-plus'></i></a>
      </header>

      {
        showDropDown && <Languages />
      }

      <div className='member-languages'>

        {
          selectedLanguages.slice().map((language, i) => {
            return <FamilyMemberAddLanguage {...language} key={i} />;
          })
        }

      </div>

    </section>
  );
}));

export default FamilyMemberAddLanguages;
