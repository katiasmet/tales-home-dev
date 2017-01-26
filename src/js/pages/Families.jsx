import React from 'react';

import {Header} from '../components/';
import {FamiliesSearch, FamiliesBrowse, FamiliesOverview} from '../components/families';

const Families = () => {
  return (
    <div className='page page-families'>
      <Header />

      <main>

        <FamiliesSearch />

        <section className='families-overview'>

          <FamiliesBrowse />
          <FamiliesOverview />

        </section>
      </main>
    </div>

  );
};

export default Families;
