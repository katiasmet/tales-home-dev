import React from 'react';

import {FormInput} from '../';

const FamilyJoin = () => {
  return (
    <section className='form join-register'>

      <form
        action=''
        method='post'
        acceptCharset='utf-8'>

        <fieldset>

          <FormInput
            id='join-form-code'
            label='Your family code'
            name='code'
            placeholder='....' />

          <button type='submit' className='btn' disabled>Start</button>

        </fieldset>

      </form>

    </section>
  );
};

export default FamilyJoin;
