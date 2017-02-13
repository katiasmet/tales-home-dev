import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty, includes} from 'lodash';

import {isLoggedIn, token} from '../auth';
import {NavigationItem} from './';

@inject(`families`, `notes`) @observer
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

      const {handleStopSession, activeFamily} = this.props.families;
      const {handleOpenNotes} = this.props.notes;
      const {model} = this.props;

      return (
        <ul className='navigation'>
          <li>
            The {activeFamily.name}&#39;s
          </li>
          {
            model && (
              <li onClick={handleOpenNotes} className='nav-item'>
                <i className='fa fa-pencil'></i>
              </li>
            )
          }

          {
            !model && (
              <li onClick={handleStopSession} className='nav-item'>
                <i className='fa fa-sign-out'></i>
              </li>
            )
          }

        </ul>
      );

    } else {

      const user = token.content().name;

      return (
        <ul className='navigation'>
          <li className='user'>
            {user}
          </li>

          <NavigationItem link='/families' icon='fa-list-ul' pathname={pathname} />
          <NavigationItem link='/editprofile' icon='fa-user' pathname={pathname} />
          <NavigationItem link='/newfamily' icon='fa-user-plus' pathname={pathname} />
        </ul>
      );
    }

  }

  renderFamilyNavigation() {

    const {pathname} = this.props;

    if (includes(pathname, `models`) || includes(pathname, `member`)) {
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

  setActive(link, pathname) {
    return (link === pathname) ? `active` : ``;
  }

  render() {

    const {pathname} = this.props;

    return (
      <nav>
          {

            (!isEmpty(isLoggedIn())) ? (this.renderNavigation())
            : (
              <ul className='navigation'>
                <NavigationItem link='/login' icon='fa-unlock' content='login' pathname={pathname} />
              </ul>
            )

          }
      </nav>
    );
  }
}

Navigation.propTypes = {
  pathname: PropTypes.string,
  model: PropTypes.bool,
  families: PropTypes.shape({
    handleStopSession: PropTypes.func,
    activeFamily: PropTypes.object,
    activeFamilyModel: PropTypes.object
  }),
  notes: PropTypes.shape({
    handleOpenNotes: PropTypes.func
  })
};

export default Navigation;
