import React, {PropTypes} from 'react';

import {Header} from '../components/';

const Home = ({location}) => {

  const {pathname} = location;

  return (
    <div className='page page-home'>
      <Header pathname={pathname} />
    </div>

  );
};

Home.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Home;
