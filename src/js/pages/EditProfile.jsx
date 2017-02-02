import React, {PropTypes} from 'react';

import {Header} from '../components/';
import {UserEdit} from '../components/user';

const EditProfile = ({location}) => {

  const {pathname} = location;

  return (
    <div className='page page-edit-profile'>
      <Header pathname={pathname} />

      <main>

        <UserEdit />
      </main>
    </div>

  );
};

EditProfile.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default EditProfile;
