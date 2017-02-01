import React, {PropTypes} from 'react';

const FamilyMemberAddLanguage = ({name, code}) => {

  console.log(code);

  return (
    <span className='form-input'>
      <label htmlFor={`language-${name}`} className='member-language'>{name}</label>
      <input  id={`language-${name}`}
              className='hidden'
              name='languages[]'
              defaultValue={name} />
    </span>
  );
};

FamilyMemberAddLanguage.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string
};

export default FamilyMemberAddLanguage;
