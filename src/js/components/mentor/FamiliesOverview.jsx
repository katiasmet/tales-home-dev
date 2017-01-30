import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Loading} from '../';
import {FamilyItem} from './family';

const renderFamilies = families => {
  return families.slice().map((family, i) => {
    return <FamilyItem key={i} {...family} />;
  });
};

const handleFamilies = (families, activeFamilies, searchInput) => {
  if (isEmpty(families)) {
    return (
        <p> Hello there! Looks like you didn't analyse any families yet.
            Start by <Link to='/newfamiliy'>adding a family</Link>.</p>
    );
  } else {
    if (isEmpty(activeFamilies)) {
      return (
        <p>There are no families where the name, origins or location contain {`"${searchInput}"`}.</p>
      );
    } else {
      return renderFamilies(activeFamilies);
    }

  }

};

const FamiliesOverview = inject(`families`)(observer(({families}) => {

  const {allFamilies, activeFamilies, searchInput, isLoading, error} = families;

  return (
    <section className='families families-overview'>

      {
        isLoading ? (<Loading />)
        : handleFamilies(allFamilies, activeFamilies, searchInput)
      }

      {!isEmpty(error) && <div className='error'>{error}</div>}

    </section>
  );
}));

FamiliesOverview.propTypes = {
  families: PropTypes.shape({
    allFamilies: PropTypes.array,
    activeFamilies: PropTypes.array,
    searchInput: PropTypes.string,
    isLoading: PropTypes.bool,
    error: PropTypes.string
  })
};

export default FamiliesOverview;
