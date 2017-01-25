import React from 'react';
import {Link} from 'react-router';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to='Login'><i className='fa fa-lock'></i> login</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
