import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header} from '../components/';
import {FamiliesSearch, FamiliesBrowse, FamiliesOverview} from '../components/mentor';
import {FamilyStartSession} from '../components/mentor/family';
import {token} from '../auth';

@inject(`families`) @observer
class Families extends Component {

  componentDidMount() {
    this.props.families.getFamilies();
  }

  render() {

    const {sessionId} = this.props.families;
    const {pathname} = this.props.location;
    const {firstLogin} = token.content();

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
    sessionId: PropTypes.string
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Families;
