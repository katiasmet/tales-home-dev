import React from 'react';
import {Link} from 'react-router-dom';

const UserProfiles = () => {
  return (
    <ul className='user-profiles'>
      <li className='user-profile'>
        <Link to='/register'>
          new mentor
        </Link>
      </li>
      <li className='user-profile'>
        <Link to='/login'>
          mentor
        </Link>
      </li>
      <li className='user-profile'>
        <Link to='/join'>
          family
        </Link>
      </li>
    </ul>
  );
};

export default UserProfiles;
