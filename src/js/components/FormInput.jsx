import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';

const FormInput = ({id, label, type = `text`, name, value, error, onChange, placeholder, maxlength, required = true}) => {

  return (
    <span className={isEmpty(error) ? `form-input` : `form-input form-error`}>

      {
        label && <label htmlFor={id}>{label} {required && `*`}</label>
      }

      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.name, e.target.value)}
        maxLength={maxlength ? maxlength : `524288`}
        required={required} />

      {isEmpty(error) ? null : <p className='error'>{error}</p>}
    </span>
  );

};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf([`text`, `email`, `password`]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxlength: PropTypes.string,
  required: PropTypes.bool
};

export default FormInput;
