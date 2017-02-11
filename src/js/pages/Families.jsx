import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header} from '../components/';
import {FamiliesSearch, FamiliesBrowse, FamiliesOverview} from '../components/mentor';
import {FamilyStartSession} from '../components/mentor/family';
import {token} from '../auth';

@inject(`families`, `formAddFamily`) @observer
class Families extends Component {

  componentDidMount() {
    this.props.families.getFamilies();
  }

  render() {

    const {sessionId, isLoading, activeFamily, handleFamilySession} = this.props.families;
    const {pathname} = this.props.location;
    const {firstLogin} = token.content();
    const {startSession} = this.props.formAddFamily;

    return (
      <div className='page page-families'>
        <Header pathname={pathname} />

        <main>

          <FamiliesSearch />

          <section   className={(!isEmpty(sessionId) && isEmpty(isLoading) && !isEmpty(activeFamily)) ?
                    `families families-pop-up` : `families`}>

            {
              (!isEmpty(startSession) && isEmpty(sessionId)) && handleFamilySession(startSession)
            }

            {
              (!isEmpty(sessionId) && isEmpty(isLoading) && !isEmpty(activeFamily)) && <FamilyStartSession />
            }

            <FamiliesBrowse />
            <FamiliesOverview />
          </section>
        </main>

        {
          firstLogin ? (
            <footer className='test-run first-run'>
              <p>Looks like you founnd your way to the Talkie application! Want to know what the application has to offer?</p>
              <button className='btn btn-test'><i className='fa fa-question'></i></button>
            </footer>
          ) : (
            <footer className='test-run next-run'>
              <figure>
                <img src='../assets/img/test_run.png' alt='test run' />
              </figure>
            </footer>
          )
        }

      </div>

    );
  }
}

Families.propTypes = {
  families: PropTypes.shape({
    getFamilies: PropTypes.func,
    sessionId: PropTypes.string,
    activeFamily: PropTypes.object,
    isLoading: PropTypes.string,
    handleFamilySession: PropTypes.func
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  formAddFamily: PropTypes.shape({
    startSession: PropTypes.string
  })
};

export default Families;
