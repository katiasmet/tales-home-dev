import React from 'react';
import {isEmpty} from 'lodash';

import {isLoggedIn, token} from '../auth';
import {NavigationItem} from './';

const {handleInfo} = () => {
  console.log(`handle info`);
};

const renderNavigation = user => {
  if (token.content().scope === `professional`) {
    return (
      <ul className='navigation'>

        <li>{user}</li>

        <NavigationItem link='/models' icon='fa-ellipsis-h' />
        <NavigationItem link='/newfamily' icon='fa-user-plus' />

        <li className='nav-item' onClick={handleInfo}>
          <i className='fa fa-info'></i>
        </li>

        <NavigationItem link='/editprofile' icon='fa-gear' />
      </ul>
    );
  } else {
    return (
      <ul className='navigation'>
        <NavigationItem link='/newfamilymember' icon='fa-plus' />
      </ul>
    );
  }


};

const Navigation = () => {

  const user = token.content().name;

  return (
    <nav>
        {

          (!isEmpty(isLoggedIn())) ? (renderNavigation(user))
          : (

            <ul className='navigation'>
              <NavigationItem link='/login' icon='fa-lock' content='login' />
            </ul>

          )

        }
    </nav>
  );
};

export default Navigation;
