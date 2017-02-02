import React, {PropTypes} from 'react';

import {Header} from '../components/';
import {FamilyAdd} from '../components/mentor/family';

const NewFamily = ({location}) => {

  const {pathname} = location;

  return (
    <div className='page page-new-family'>
      <Header pathname={pathname} />

      <main>
        <FamilyAdd />
      </main>
    </div>

  );
};

NewFamily.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default NewFamily;
