import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import {Navigation} from './';

const Header = ({pathname}) => {
  return (
    <header className='familie-overview-header'>
        <Link to='/'><div className='logo'></div></Link>
        <Navigation pathname={pathname} />
    </header>
  );
};

Header.propTypes = {
  pathname: PropTypes.string
};

export default Header;
