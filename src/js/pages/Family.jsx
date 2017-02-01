import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';

import {Header, Loading} from '../components/';
import {FamilyOverview} from '../components/family';
import {content} from '../auth/token';

//families.
@inject(`families`, `languages`) @observer
class Family extends Component {

  componentDidMount() {
    const {getFamilyMembers} = this.props.families;
    getFamilyMembers(content().sub, true);

    const {getLanguages} = this.props.languages;
    getLanguages();
  }

  render() {
    const {isLoading} = this.props.families;
    return (
      <div className='page page-family'>
        <Header />

        {
          (isLoading === `familymembers`) ? (<Loading />)
          : <FamilyOverview />
        }

      </div>

    );
  }
}

Family.propTypes = {
  families: PropTypes.shape({
    isLoading: PropTypes.string,
    getFamilyMembers: PropTypes.func
  }),
  languages: PropTypes.shape({
    getLanguages: PropTypes.func
  })
};

export default Family;