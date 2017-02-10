import React, {PropTypes}  from 'react';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FormInput} from '../';
import {logout} from '../../auth';

const UserEdit = inject(`formEditUser`)(observer(({formEditUser}) => {

  const {form, handleChange, handleSubmit} = formEditUser;
  const {fields, meta, success} = form;

  return (

    <section className='form form-edit-user'>

      <h1> Edit your profile </h1>

      <form
        action=''
        method='post'
        acceptCharset='utf-8'
        onSubmit={handleSubmit}>

        <fieldset>

          <FormInput
            id='edit-form-name'
            label='Name'
            name='name'
            value={fields.name.value}
            error={fields.name.error}
            onChange={handleChange}
            placeholder='f.e. Emma Johnson' />

          <FormInput
            id='edit-form-email'
            label='Email'
            type='email'
            name='email'
            value={fields.email.value}
            error={fields.email.error}
            onChange={handleChange}
            placeholder='example@example.com' />

          <FormInput
            id='edit-form-organisation'
            label='Organisation'
            name='organisation'
            value={fields.organisation.value}
            error={fields.organisation.error}
            onChange={handleChange}
            placeholder='f.e. Howest University College' />

          <FormInput
            id='edit-form-password'
            label='Password'
            type='password'
            name='password'
            value={fields.password.value}
            error={fields.password.error}
            onChange={handleChange}
            placeholder='your password' />

            <FormInput
              id='edit-form-new-password'
              label='Change password'
              type='password'
              name='newpassword'
              value={fields.newpassword.value}
              error={fields.newpassword.error}
              onChange={handleChange}
              placeholder='your new password' />

          {!isEmpty(meta.error) && <div className='error'>{meta.error}</div>}

          <div className='form-actions'>
            <button type='button' className='btn' onClick={handleRemoveUser}><i className='fa fa-trash'></i></button>
            <button className='btn' disabled={!meta.isValid} onClick={handleSubmit}><i className='fa fa-save'></i></button>
            <button type='button' className='btn' onClick={handleLogout}><i className='fa fa-sign-out'></i></button>
          </div>

        </fieldset>

      </form>

      {
        success && (
          <section className='info info-success'>
            <p>{success}</p>
          </section>
        )
      }

    </section>
  );
}));

const handleLogout = () => {
  logout();
  window.location.href = `/`;
};

const handleRemoveUser = () => {
  console.log(`remove user`);

  //delete user, notes, results, his families, familymodels ans familymembers
};

UserEdit.propTypes = {
  formEditUser: PropTypes.shape({
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
      success: PropTypes.string
    }).isRequired
  })
};

export default UserEdit;
