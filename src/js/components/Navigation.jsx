import React from 'react';
import {Link} from 'react-router';
import {isLoggedIn, logout} from '../auth';

const handleLogout = () => {
  console.log(`handle logout`);
  logout();
  window.location.href = `/`;
};

const Navigation = () => {
  return (
    <nav>
      <ul>

        {
          isLoggedIn() ? (<li onClick={handleLogout}><i className='fa fa-sign-out'></i></li>)
          : (<li><Link to='/login'><i className='fa fa-lock'></i> login</Link></li>)
        }


      </ul>
    </nav>
  );
};

export default Navigation;
