import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

const UserProfiles = ({pathname}) => {
  return (
    <ul className='user-profiles'>
      <li className='user-profile-join'>
        <Link to='/join' className={`user-profile ${setActive(`/join`, pathname)} `}>
          Family
        </Link>
      </li>
      <li className='user-profile-login'>
        <Link to='/login' className={`user-profile ${setActive(`/login`, pathname)} `}>
          Mentor
        </Link>
      </li>
      <li className='user-profile-register'>
        <Link to='/register' className={`user-profile ${setActive(`/register`, pathname)} `}>
          New mentor
        </Link>
      </li>
    </ul>
  );
};

const setActive = (link, pathname) => {
  return (link === pathname) ? `active` : ``;
};

UserProfiles.propTypes = {
  pathname: PropTypes.string
};

export default UserProfiles;
