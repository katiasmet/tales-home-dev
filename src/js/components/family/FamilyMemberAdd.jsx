import React, {PropTypes}  from 'react';
import {Redirect, Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FormInput} from '../';
import {FamilyMemberAddCharacters, FamilyMemberAddLanguages, FamilyMemberAddRoles} from './';

const FamilyMemberAdd = inject(`formAddFamilyMember`)(observer(({formAddFamilyMember}) => {

  const {form, handleChange, handleSubmit} = formAddFamilyMember;
  const {fields, meta, redirect} = form;

  return (

    <section className='form form-add-family-member'>

      {
        redirect && <Redirect to={`/family`} />
      }

      <form
        action=''
        method='post'
        acceptCharset='utf-8'
        onSubmit={handleSubmit}>

        <fieldset>

          <FamilyMemberAddCharacters handleChange={handleChange} />

          <FormInput
            id='familymember-form-name'
            label='First name'
            name='firstName'
            value={fields.firstName.value}
            error={fields.firstName.error}
            onChange={handleChange}
            placeholder='f.e. Harry' />

          <FamilyMemberAddRoles handleChange={handleChange} />

          <FamilyMemberAddLanguages />


          {!isEmpty(meta.error) && <div className='error'>{meta.error}</div>}

          <div className='form-actions'>
            <ul>
              <li>
                <Link to='/family'>
                  <i className='fa fa-close'></i>
                </Link>
              </li>
              <li>
                <button type='submit' className='btn'><i className='fa fa-caret-right'></i></button>
              </li>
            </ul>
          </div>

        </fieldset>

      </form>
    </section>
  );
}));

FamilyMemberAdd.propTypes = {
  formAddFamilyMember: PropTypes.shape({
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

export default FamilyMemberAdd;
