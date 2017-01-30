import React, {PropTypes}  from 'react';
import {Redirect, Link} from 'react-router';
import {observer, inject} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FormInput} from '../../';

const FamilyAdd = inject(`formAddFamily`)(observer(({formAddFamily}) => {

  const {form, handleChange, handleSubmit, handleSubmitButton} = formAddFamily;
  const {fields, meta, redirect} = form;

  return (

    <section className='form form-add-family'>

      {
        !isEmpty(redirect) && <Redirect to={`/${redirect}`} />
      }

      <form
        action=''
        method='post'
        acceptCharset='utf-8'
        onSubmit={handleSubmit}>

        <fieldset>

          <FormInput
            id='family-form-name'
            label='Surname'
            name='name'
            value={fields.name.value}
            error={fields.name.error}
            onChange={handleChange}
            placeholder='f.e. Johnson' />

          <FormInput
            id='family-form-origins'
            label='Where does this family come from?'
            name='origins'
            value={fields.origins.value}
            error={fields.origins.error}
            onChange={handleChange}
            placeholder='f.e. Greece' />

          <FormInput
            id='family-form-home-location'
            label='Where does this family live?'
            name='homeLocation'
            value={fields.homeLocation.value}
            error={fields.homeLocation.error}
            onChange={handleChange}
            placeholder='f.e. London' />

          {!isEmpty(meta.error) && <div className='error'>{meta.error}</div>}

          <div className='form-actions'>
            <ul>
              <li>
                <Link to='/families'>
                  <i className='fa fa-close'></i>
                </Link>

              </li>
              <li>
                <button type='submit' className='btn' disabled={!meta.isValid} onClick={e => handleSubmitButton(e, `save`)}><i className='fa fa-save'></i></button>
              </li>
              <li>
                <button type='submit' className='btn' disabled={!meta.isValid} onClick={e => handleSubmitButton(e, `start`)}><i className='fa fa-caret-right'></i></button>
              </li>
            </ul>
          </div>

        </fieldset>

      </form>
    </section>
  );
}));

FamilyAdd.propTypes = {
  formAddFamily: PropTypes.shape({
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
      redirect: PropTypes.string
    }).isRequired
  })
};

export default FamilyAdd;