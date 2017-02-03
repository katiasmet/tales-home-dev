import React from 'react';
import {inject, observer} from 'mobx-react';

import {Language} from './';

const Languages = inject(`languages`)(observer(({languages}) => {

  const {allLanguages, handleSelectLanguage} = languages;

  return (
    <ul className='languages'>

      {

        allLanguages.slice().map((language, i) => {
          return <Language {...language} key={i} handleSelectLanguage={handleSelectLanguage} />;
        })

      }

    </ul>
  );
}));

export default Languages;
