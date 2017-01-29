import React from 'react';
import {inject, observer} from 'mobx-react';

import {FormInput} from '../';

const FamiliesSearch = inject(`families`)(observer(({families}) => {

  const {searchInput, handleSearch} = families;

  return (
    <section className='families families-search'>
      <FormInput
        id='search-form'
        name='search'
        value={searchInput}
        onChange={handleSearch}
        placeholder='Search family' />
    </section>
  );
}));

export default FamiliesSearch;
