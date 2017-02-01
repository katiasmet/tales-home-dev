import React from 'react';
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

      <form
        action=''
        method='post'
        acceptCharset='utf-8'
        onSubmit={handleSubmit}>

        <fieldset>

          <FormInput
            id='join-form-code'
            label='Your family code'
            name='sessionId'
            value={fields.sessionId.value}
            error={fields.sessionId.error}
            onChange={handleChange}
            placeholder='0000'
            maxlength='4' />

          {!isEmpty(meta.error) && <div className='error'>{meta.error}</div>}

          <button type='submit' className='btn' disabled={!meta.isValid}><i className='fa fa-caret-right'></i></button>

        </fieldset>

      </form>

    </section>
  );
}));

export default FamilyJoin;
