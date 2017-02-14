import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Loading} from '../';
import {FamilyItem} from './family';
import {ProfessorEmptyFamilies, ProfessorSearch} from '../illustrations';

const renderFamilies = families => {
  return families.slice().map((family, i) => {
    return <FamilyItem key={i} {...family} />;
  });
};

const handleFamilies = (families, activeFamilies) => {
  if (isEmpty(families)) {
    return (
      <div className='info info-empty'>
        <p className='text-balloon'>
          Well Hello,<br />
          Are you new here? I’ll show you where to <Link to='/newfamily'>add your families</Link>!
        </p>
        <figure className='info-image'>
          <div className='info-image-bg'></div>
          <ProfessorEmptyFamilies />
        </figure>
      </div>

    );
  } else {
    if (isEmpty(activeFamilies)) {
      return (
        <div className='info info-search'>
          <p className='text-balloon'>
            Hmmmm,
            <br />Looks like there is no family called that way.
            <br />Are you sure about the writing?
          </p>
          <figure className='info-image'>
            <div className='info-image-bg'></div>
            <ProfessorSearch />
          </figure>
        </div>
      );
    } else {
      return renderFamilies(activeFamilies);
    }

  }

};

const FamiliesOverview = inject(`families`)(observer(({families}) => {

  const {allFamilies, activeFamilies, isLoading} = families;

  return (
    <section className='families-overview'>

      <h1>Families</h1>

      {
        (isLoading === `families`) ? (<Loading />)
        : handleFamilies(allFamilies, activeFamilies)
      }

    </section>
  );
}));

FamiliesOverview.propTypes = {
  families: PropTypes.shape({
    allFamilies: PropTypes.array,
    activeFamilies: PropTypes.array,
    isLoading: PropTypes.string,
    error: PropTypes.string
  })
};

export default FamiliesOverview;
