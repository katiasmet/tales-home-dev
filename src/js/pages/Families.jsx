import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';

import {Header} from '../components/';
import {FamiliesSearch, FamiliesBrowse, FamiliesOverview} from '../components/mentor';

@inject(`families`) @observer
class Families extends Component {

  componentDidMount() {
    this.props.families.getFamilies();
  }

  render() {
    return (
      <div className='page page-families'>
        <Header />

        <main>

          <FamiliesSearch />

          <section className='families'>

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
    getFamilies: PropTypes.func
  })
};

export default Families;
