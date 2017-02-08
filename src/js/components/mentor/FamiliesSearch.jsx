import React, {PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {FormInput} from '../';

const FamiliesSearch = inject(`families`)(observer(({families}) => {

  const {searchInput, handleSearch} = families;

  return (
    <section className='families-search'>
      <FormInput
        id='search-form'
        name='search'
        value={searchInput}
        onChange={handleSearch}
        placeholder='Search family' />
    </section>
  );
}));

FamiliesSearch.propTypes = {
  families: PropTypes.shape({
    searchInput: PropTypes.string,
    handleSearch: PropTypes.func
  })
};

export default FamiliesSearch;
