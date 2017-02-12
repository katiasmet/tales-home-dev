import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header, Loading} from '../components/';
import {FamilyMembers} from '../components/family';
import {FamilyBg} from '../components/illustrations';
import {content} from '../auth/token';

//familieside
@inject(`families`, `languages`) @observer
class Family extends Component {
  componentDidMount() {
    const {handleFamilyMembersVisites} = this.props.families;
    handleFamilyMembersVisites();

    const {getFamilyMembers} = this.props.families;
    getFamilyMembers(content().sub, true);

    const {getLanguages} = this.props.languages;
    getLanguages();
  }

  render() {
    const {isLoading, handleStartSession, activeFamily} = this.props.families;
    const {familymembers} = activeFamily;
    const {pathname} = this.props.location;
    const name = content().name;

    return (
      <div className='page page-family'>
        <FamilyBg />

        <Header pathname={pathname} />

        <main>

          {
            (isLoading === `familymembers`) ? (<Loading />)
            : <FamilyMembers />
          }
        </main>

        <footer>

          {
            (!isEmpty(familymembers)) && (
              <div onClick={handleStartSession} className='btn-handle-session'>
                <Link to='/models' className='btn'>
                  <i className='fa fa-play'></i>
                </Link>
              </div>
            )
          }

          <h1>The {name}&#39;s</h1>
        </footer>

      </div>
    );
  }
}

Family.propTypes = {
  families: PropTypes.shape({
    isLoading: PropTypes.string,
    getFamilyMembers: PropTypes.func,
    handleFamilyMembersVisites: PropTypes.func,
    handleStartSession: PropTypes.func,
    activeFamily: PropTypes.object
  }),
  languages: PropTypes.shape({
    getLanguages: PropTypes.func
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Family;
