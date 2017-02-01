import React, {PropTypes} from 'react';

const Language = ({name, code, handleSelectLanguage}) => {
  return (
    <li className='language' onClick={handleSelectLanguage}>
      {name}
    </li>
  );
};

Language.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  handleSelectLanguage: PropTypes.func
};

export default Language;
