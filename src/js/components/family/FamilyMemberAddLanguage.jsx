import React, {PropTypes} from 'react';

const FamilyMemberAddLanguage = ({nativeName}) => {

  return (
    <span className='form-input'>
      <label htmlFor={`language-${name}`} className='member-language'>{nativeName}</label>
      <input  id={`language-${name}`}
              className='hidden'
              name='languages[]'
              defaultValue={name} />
    </span>
  );
};

FamilyMemberAddLanguage.propTypes = {
  nativeName: PropTypes.string,
  code: PropTypes.string
};

export default FamilyMemberAddLanguage;
