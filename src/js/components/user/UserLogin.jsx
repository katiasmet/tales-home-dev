import React, {PropTypes}  from 'react';
import {Link, Redirect} from 'react-router';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FormInput} from '../';

const UserLogin = inject(`formLogin`)(observer(({formLogin}) => {

  const {form, handleChange, handleSubmit} = formLogin;
  const {fields, meta, redirect} = form;

  return (

        <section className='form form-login'>

          {
            redirect && (
              <Redirect to='/families' />
            )
          }

          <form
            action=''
            method='post'
            acceptCharset='utf-8'
            onSubmit={handleSubmit}>

            <fieldset>

              <FormInput
                id='login-form-email'
                label='Email'
                type='email'
                name='email'
                value={fields.email.value}
                error={fields.email.error}
                onChange={handleChange}
                placeholder='example@example.com' />

              <FormInput
                id='login-form-password'
                label='Password'
                type='password'
                name='password'
                value={fields.password.value}
                error={fields.password.error}
                onChange={handleChange}
                placeholder='your password' />

              {!isEmpty(meta.error) && <div className='error'>{meta.error}</div>}

              <button type='submit' className='btn' disabled={!meta.isValid}>Log In</button>

            </fieldset>

          </form>

          <section className='info info-login'>
            <p>Don't have a profile on Tales@Home? <Link to='/register'>Register today!</Link> </p>
            <p><Link to='/'>Forgotten your password?</Link></p>
          </section>

        </section>
  );
}));

UserLogin.propTypes = {
  formLogin: PropTypes.shape({
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

export default UserLogin;
