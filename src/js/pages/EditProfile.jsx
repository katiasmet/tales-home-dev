import React from 'react';

import {Header} from '../components/';
import {UserEdit} from '../components/user';

const EditProfile = () => {
  return (
    <div className='page page-edit-profile'>
      <Header />

      <main>
        <h1>Edit Profile</h1>

        <UserEdit />
      </main>
    </div>

  );
};

export default EditProfile;
