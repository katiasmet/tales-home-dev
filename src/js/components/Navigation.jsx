import React from 'react';
import {isEmpty} from 'lodash';

import {isLoggedIn, token} from '../auth';
import {NavigationItem} from './';

const renderNavigation = user => {
  if (token.content().scope === `professional`) {
    return (
      <ul className='navigation'>
        <NavigationItem link='/newfamily' icon='fa-user-plus' />

        <li>{user}</li>
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
