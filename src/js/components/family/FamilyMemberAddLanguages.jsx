import React from 'react';
import {inject, observer} from 'mobx-react';

import {Languages} from '../';

const FamilyMemberAddLanguages = inject(`languages`)(observer(({languages}) => {

  const {getLanguages, showDropDown} = languages;

  return (
    <section className='form-roles'>

      <header>
        <h3 className='label'>What languages do you speak?</h3>
        <button className='btn' onClick={() => getLanguages(true)}><i className='fa fa-plus'></i></button>
      </header>

      {
        showDropDown && <Languages />
      }

      <div className='member-languages'>

        <span className='form-input'>
          <label htmlFor='language-engels' className='member-language'>Engels</label>
          <input  id='language-engels'
                  className='hidden'
                  name='languages[]'
                  defaultValue='engels' />
        </span>

        <span className='form-input'>
          <label  htmlFor='language-frans' className='member-language'>Frans</label>
          <input  id='language-frans'
                  className='hidden'
                  name='languages[]'
                  defaultValue='frans' />
        </span>

      </div>

    </section>
  );
}));

export default FamilyMemberAddLanguages;
