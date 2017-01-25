import React from 'react';
import {Link} from 'react-router';

const UserProfiles = () => {
  return (
    <ul className='user-profiles'>
      <li className='user-profile'>
        <Link to='Register'>
          new mentor
        </Link>
      </li>
      <li className='user-profile'>
        <Link to='Login'>
          mentor
        </Link>
      </li>
      <li className='user-profile'>
        <Link to='Join'>
          family
        </Link>
      </li>
    </ul>
  );
};

export default UserProfiles;
