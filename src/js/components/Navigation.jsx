import React from 'react';

import {isLoggedIn, logout} from '../auth';

import {NavigationItem} from './';

const handleLogout = () => {
  logout();
  window.location.href = `/`;
};

const {handleInfo} = () => {
  console.log(`handle info`);
};

const Navigation = () => {
  return (
    <nav>
        {

          isLoggedIn() ? (

            <ul>

              <NavigationItem link='/models' icon='fa-ellipsis-h' />
              <NavigationItem link='/newfamily' icon='fa-user-plus' />

              <li onClick={handleInfo}>
                <i className='fa fa-info'></i>
              </li>

              <NavigationItem link='/editprofile' icon='fa-gear' />

              <li onClick={handleLogout}>
                <i className='fa fa-sign-out'></i>
              </li>
            </ul>

          ) : (

            <ul>
              <NavigationItem link='/login' icon='fa-lock' content='login' />
            </ul>

          )

        }
    </nav>
  );
};

export default Navigation;
