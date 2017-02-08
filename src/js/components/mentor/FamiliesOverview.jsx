import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
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
            Start by <Link to='/newfamily'>adding a family</Link>.</p>
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

  const {allFamilies, activeFamilies, searchInput, isLoading} = families;

  return (
    <section className='families-overview'>

      <h1>Families</h1>

      {
        (isLoading === `families`) ? (<Loading />)
        : handleFamilies(allFamilies, activeFamilies, searchInput)
      }

    </section>
  );
}));

FamiliesOverview.propTypes = {
  families: PropTypes.shape({
    allFamilies: PropTypes.array,
    activeFamilies: PropTypes.array,
    searchInput: PropTypes.string,
    isLoading: PropTypes.string,
    error: PropTypes.string
  })
};

export default FamiliesOverview;
