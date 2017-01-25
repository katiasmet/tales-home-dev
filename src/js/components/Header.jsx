import React from 'react';
import {Link} from 'react-router';

import {Navigation} from './';

const Header = () => {
  return (
    <header>
      <h1><Link to='/'>Tales@Home</Link></h1>
      <Navigation />
    </header>
  );
};

export default Header;
