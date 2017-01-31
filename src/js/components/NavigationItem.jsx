import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import {isEmpty} from 'lodash';

const NavigationItem = ({link, icon, content}) => {
  return (
    <li className='nav-item'>
      <Link to={link}>
        {
          !isEmpty(icon) && (<i className={`fa ${icon}`}></i>)
        }
        {content}
      </Link>
    </li>
  );
};

NavigationItem.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.string,
  content: PropTypes.string
};

export default NavigationItem;
