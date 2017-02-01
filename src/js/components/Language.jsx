import React, {PropTypes} from 'react';

const Language = ({name, code}) => {
  return (
    <li className='language'>
      {name}
    </li>
  );
};

Language.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string
};

export default Language;
