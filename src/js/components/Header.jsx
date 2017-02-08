import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import {Navigation} from './';

const Header = ({pathname, model = false}) => {
  return (
    <header className='main-header'>
        <Link to='/'><div className='logo'></div></Link>
        <Navigation pathname={pathname} model={model} />
    </header>
  );
};

Header.propTypes = {
  pathname: PropTypes.string,
  model: PropTypes.bool
};

export default Header;
