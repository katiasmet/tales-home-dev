import React from 'react';
import {Link} from 'react-router-dom';

import {Navigation} from './';

const Header = () => {
  return (
    <header className='familie-overview-header'>
        <Link to='/'><h1><span>Tales@Home</span></h1></Link>
        <Navigation />
    </header>
  );
};

export default Header;
