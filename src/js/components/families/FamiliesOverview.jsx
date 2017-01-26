import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Loading} from '../';
import {FamilyItem} from './family';

const FamiliesOverview = inject(`families`)(observer(({families}) => {

  const {allFamilies, isLoading, error} = families;

  return (
    <section className='families families-overview'>

      {
        isLoading && (<Loading />)
      }

      {
        isEmpty(allFamilies) ? (
          <p>Hello there! Looks like you didn't analyse any families yet. Start by <Link to='/newfamiliy'>adding a family</Link>.</p>
        )
        : (
          allFamilies.map((family, i) => (
            <FamilyItem {...family} key={i} />
          ))
        )
      }

      {!isEmpty(error) && <div className='error'>{error}</div>}

    </section>
  );
}));

export default FamiliesOverview;
