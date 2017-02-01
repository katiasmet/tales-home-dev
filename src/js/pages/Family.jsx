import React from 'react';
import {inject, observer} from 'mobx-react';

import {Header, Loading} from '../components/';

const Family = inject(`families`)(observer(({families}) => {

  const {isLoading} = families;

  return (
    <div className='page page-family'>
      <Header />

        {
          (isLoading === `familymembers`) ? (<Loading />)
          : <p>yes yes joepie</p>
        }
    </div>

  );
}));

export default Family;
