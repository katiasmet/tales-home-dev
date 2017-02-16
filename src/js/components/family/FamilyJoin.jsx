import React, {PropTypes} from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FormInput} from '../';

const FamilyJoin = inject(`formJoin`)(observer(({formJoin}) => {

  const {form, handleChange, handleSubmit} = formJoin;
  const {fields, meta, redirect} = form;

  return (
    <section className='form form-join'>

      {
        redirect && (
          <Redirect to='/family' />
        )
      }

      <h1>Start family session</h1>

      <form
        action=''
        method='post'
        acceptCharset='utf-8'
        onSubmit={handleSubmit}>


        <fieldset>

          <FormInput
            id='join-form-code'
            label='Your family code'
            type='number'
            name='sessionId'
            value={fields.sessionId.value}
            error={fields.sessionId.error}
            onChange={handleChange}
            placeholder='0000'
            maxlength='4' />

          {!isEmpty(meta.error) && <div className='error'>{meta.error}</div>}

        </fieldset>

        <button type='submit' className='btn' disabled={!meta.isValid}><i className='fa fa-play'></i></button>

      </form>

    </section>
  );
}));

FamilyJoin.propTypes = {
  formJoin: PropTypes.shape({
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

export default FamilyJoin;
