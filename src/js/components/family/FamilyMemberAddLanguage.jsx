import React, {PropTypes} from 'react';

const FamilyMemberAddLanguage = ({nativeName, handleRemove}) => {

  return (
    <span className='form-input'>
      <label htmlFor={`language-${name}`} className='member-language'>{nativeName}<i className='fa fa-close' onClick={() => handleRemove(nativeName)}></i></label>
      <input  id={`language-${name}`}
              className='hidden'
              name='languages[]'
              defaultValue={name} />

    </span>
  );
};

FamilyMemberAddLanguage.propTypes = {
  nativeName: PropTypes.string,
  handleRemove: PropTypes.func
};

export default FamilyMemberAddLanguage;
