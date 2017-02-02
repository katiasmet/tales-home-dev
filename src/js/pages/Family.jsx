import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import {Header, Loading} from '../components/';
import {FamilyOverview} from '../components/family';
import {content} from '../auth/token';

//familieside
@inject(`families`, `languages`) @observer
class Family extends Component {

  componentWillMount() {
    const {handleFamilyMembersVisites} = this.props.families;
    handleFamilyMembersVisites();
  }

  componentDidMount() {
    const {getFamilyMembers} = this.props.families;
    getFamilyMembers(content().sub, true);

    const {getLanguages} = this.props.languages;
    getLanguages();
  }

  render() {
    const {isLoading, handleStartSession} = this.props.families;
    const {pathname} = this.props.location;

    return (
      <div className='page page-family'>
        <Header pathname={pathname} />

        {
          (isLoading === `familymembers`) ? (<Loading />)
          : <FamilyOverview />
        }

        <div onClick={handleStartSession} >
          <Link to='/models' className='btn'>
            <i className='fa fa-caret-right'></i>
          </Link>
        </div>

      </div>
    );
  }
}

Family.propTypes = {
  families: PropTypes.shape({
    isLoading: PropTypes.string,
    getFamilyMembers: PropTypes.func,
    handleFamilyMembersVisites: PropTypes.func,
    handleStartSession: PropTypes.func
  }),
  languages: PropTypes.shape({
    getLanguages: PropTypes.func
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Family;
