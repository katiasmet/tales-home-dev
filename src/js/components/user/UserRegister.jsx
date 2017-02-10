import React, {PropTypes}  from 'react';
import {Redirect} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FormInput} from '../';

const UserRegister = inject(`formRegister`)(observer(({formRegister}) => {

  const {form, handleChange, handleSubmit} = formRegister;
  const {fields, meta, redirect} = form;

  console.log(redirect);

  return (

    <section className='form form-register'>

      {
        redirect && (
          <Redirect to='/families' />
        )
      }

      <h1>Register new mentor</h1>

      <form
        action=''
        method='post'
        acceptCharset='utf-8'
        onSubmit={handleSubmit}>

        <fieldset>

          <FormInput
            id='register-form-name'
            label='Name'
            name='name'
            value={fields.name.value}
            error={fields.name.error}
            onChange={handleChange}
            placeholder='f.e. Emma Johnson' />

          <FormInput
            id='register-form-email'
            label='Email'
            type='email'
            name='email'
            value={fields.email.value}
            error={fields.email.error}
            onChange={handleChange}
            placeholder='example@example.com' />

          <FormInput
            id='register-form-password'
            label='Password'
            type='password'
            name='password'
            value={fields.password.value}
            error={fields.password.error}
            onChange={handleChange}
            placeholder='your password' />

          <FormInput
            id='register-form-organisation'
            label='Organisation'
            name='organisation'
            value={fields.organisation.value}
            error={fields.organisation.error}
            onChange={handleChange}
            placeholder='f.e. Howest University College'
            required={false} />

          {!isEmpty(meta.error) && <div className='error'>{meta.error}</div>}

        </fieldset>

        <button type='submit' className='btn' disabled={!meta.isValid}><i className='fa fa-play'></i></button>

      </form>
    </section>
  );
}));

UserRegister.propTypes = {
  formRegister: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    form: PropTypes.shape({
      fields: PropTypes.objectOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.any,
      })).isRequired,
      meta: PropTypes.shape({
        isValid: PropTypes.bool.isRequired,
        error: PropTypes.any
      }).isRequired,
      redirect: PropTypes.bool
    }).isRequired
  })
};

export default UserRegister;
