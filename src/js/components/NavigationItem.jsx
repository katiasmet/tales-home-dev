import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import {isEmpty} from 'lodash';

const NavigationItem = ({link, icon, content, pathname}) => {
  return (
    <li>
      <Link to={link} className={`nav-item ${setActive(link, pathname)} `}>
        {
          !isEmpty(icon) && (<i className={`fa ${icon}`}></i>)
        }
        {
          content && <span>{content}</span>
        }
      </Link>
    </li>
  );
};

const setActive = (link, pathname) => {
  return (link === pathname) ? `active` : ``;
};

NavigationItem.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.string,
  content: PropTypes.string,
  pathname: PropTypes.string
};

export default NavigationItem;
