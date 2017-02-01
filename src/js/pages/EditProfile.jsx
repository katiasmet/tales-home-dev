import React from 'react';

import {Header} from '../components/';
import {UserEdit} from '../components/user';

const EditProfile = () => {
  return (
    <div className='page page-edit-profile'>
      <Header />

      <main>

        <UserEdit />
      </main>
    </div>

  );
};

export default EditProfile;
