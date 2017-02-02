import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty, includes} from 'lodash';

import {isLoggedIn, token} from '../auth';
import {NavigationItem} from './';

@inject(`families`) @observer
class Navigation extends Component {

  renderNavigation() {
    if (token.content().scope === `professional`) {
      return this.renderProfessionalNavigation();
    } else {
      return this.renderFamilyNavigation();
    }
  }

  renderProfessionalNavigation() {

    const {pathname} = this.props;

    if (includes(pathname, `models`)) {

      const {handleStopSession} = this.props.families;

      return (
        <ul className='navigation'>
          <li onClick={handleStopSession} >
            <i className='fa fa-sign-out'></i>
          </li>
        </ul>
      );

    } else {

      const {user} = token.content().name;

      return (
        <ul className='navigation'>
          <NavigationItem link='/newfamily' icon='fa-user-plus' pathname={pathname} />

          <li>{user}</li>
          <NavigationItem link='/editprofile' icon='fa-gear' pathname={pathname} />
        </ul>
      );
    }

  }

  renderFamilyNavigation() {

    const {pathname} = this.props;

    if (includes(pathname, `models`)) {
      return (
        <ul className='navigation'>
          <NavigationItem link='/family' icon='fa-users' pathname={pathname} />
        </ul>
      );
    } else {
      return (
        <ul className='navigation'>
          <NavigationItem link='/newfamilymember' icon='fa-plus' pathname={pathname} />
        </ul>
      );
    }

  }

  render() {

    const {pathname} = this.props;

    return (
      <nav>
          {

            (!isEmpty(isLoggedIn())) ? (this.renderNavigation())
            : (
              <ul className='navigation'>
                <NavigationItem link='/login' icon='fa-lock' content='login' pathname={pathname} />
              </ul>
            )

          }
      </nav>
    );
  }
}

Navigation.propTypes = {
  pathname: PropTypes.string,
  families: PropTypes.shape({
    handleStopSession: PropTypes.func
  })
};

export default Navigation;
