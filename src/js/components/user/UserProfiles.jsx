import React from 'react';
import {Link} from 'react-router-dom';

const UserProfiles = () => {
  return (
    <ul className='user-profiles'>
      <li>
        <Link to='/join' className='user-profile'>
          Family
        </Link>
      </li>
      <li>
        <Link to='/login' className='user-profile'>
          Mentor
        </Link>
      </li>
      <li>
        <Link to='/register' className='user-profile'>
          New mentor
        </Link>
      </li>
    </ul>
  );
};

export default UserProfiles;
