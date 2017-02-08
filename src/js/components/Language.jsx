import React, {PropTypes} from 'react';

const Language = ({nativeName, handleSelectLanguage}) => {

  return (
    <li className='language' onClick={handleSelectLanguage}>
      {nativeName}
    </li>
  );
};

Language.propTypes = {
  nativeName: PropTypes.string,
  handleSelectLanguage: PropTypes.func
};

export default Language;
