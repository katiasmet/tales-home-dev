import React from 'react';

import {isLoggedIn, token} from '../auth';
import {NavigationItem} from './';

const {handleInfo} = () => {
  console.log(`handle info`);
};

const Navigation = () => {

  const user = token.content().name;

  return (
    <nav>
        {

          isLoggedIn() ? (

            <ul>

              <li>{user}</li>

              <NavigationItem link='/models' icon='fa-ellipsis-h' />
              <NavigationItem link='/newfamily' icon='fa-user-plus' />

              <li className='nav-item' onClick={handleInfo}>
                <i className='fa fa-info'></i>
              </li>

              <NavigationItem link='/editprofile' icon='fa-gear' />
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
