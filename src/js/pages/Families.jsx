import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header} from '../components/';
import {FamiliesSearch, FamiliesBrowse, FamiliesOverview} from '../components/mentor';
import {FamilyStartSession} from '../components/mentor/family';

@inject(`families`) @observer
class Families extends Component {

  componentDidMount() {
    this.props.families.getFamilies();
  }

  render() {

    const {sessionId} = this.props.families;
    const {pathname} = this.props.location;

    return (
      <div className='page page-families'>
        <Header pathname={pathname} />

        <main>

          <FamiliesSearch />

          <section className={!isEmpty(sessionId) ? `families families-pop-up` : `families`}>

            {
              !isEmpty(sessionId) && <FamilyStartSession />
            }

            <FamiliesBrowse />
            <FamiliesOverview />
          </section>
        </main>
      </div>

    );
  }
}

Families.propTypes = {
  families: PropTypes.shape({
    getFamilies: PropTypes.func,
    sessionId: PropTypes.string
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Families;
