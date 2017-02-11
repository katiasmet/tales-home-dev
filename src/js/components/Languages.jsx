import React from 'react';
import {inject, observer} from 'mobx-react';

import {Language, FormInput} from './';

const Languages = inject(`languages`)(observer(({languages}) => {

  const {availableLanguages, handleSelectLanguage, handleSearch, searchInput} = languages;

  return (
    <ul className='languages'>

      <li className='language search'>
        <FormInput
          id='search-form'
          name='search'
          value={searchInput}
          onChange={handleSearch}
          placeholder='Search language' />
      </li>

      {

        availableLanguages.slice().map((language, i) => {
          return <Language {...language} key={i} handleSelectLanguage={handleSelectLanguage} />;
        })

      }

    </ul>
  );
}));

export default Languages;
