import React from 'react';
import {Link} from 'react-router-dom';

import {Navigation} from './';

const Header = () => {
  return (
    <div className='familie-overview-header'>
      <header>
          <Link to='/'><h1><span>Tales@Home</span></h1></Link>
          <Navigation />
      </header>
    </div>
  );
};

export default Header;
