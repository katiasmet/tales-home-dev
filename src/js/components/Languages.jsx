import React from 'react';
import {inject, observer} from 'mobx-react';

import {Language} from './';

const Languages = inject(`languages`)(observer(({languages}) => {

  const {allLanguages} = languages;

  return (
    <ul className='languages'>

      {

        allLanguages.slice().map((language, i) => {
          return <Language {...language} key={i} />;
        })

      }

    </ul>
  );
}));

export default Languages;
