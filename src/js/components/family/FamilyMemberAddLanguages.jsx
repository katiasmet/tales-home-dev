import React from 'react';

const FamilyMemberAddLanguages = () => {

  return (
    <section className='form-roles'>

      <header>
        <h3 className='label'>What languages do you speak?</h3>
        <button className='btn'><i className='fa fa-plus'></i></button>
      </header>

      <div className='member-languages'>

        <span className='form-input'>
          <label htmlFor='language-engels' className='member-language'>Engels</label>
          <input  id='language-engels'
                  className='hidden'
                  name='languages[]'
                  defaultValue='engels' />
        </span>

        <span className='form-input'>
          <label  htmlFor='language-frans' className='member-language'>Frans</label>
          <input  id='language-frans'
                  className='hidden'
                  name='languages[]'
                  defaultValue='frans' />
        </span>

      </div>

    </section>
  );
};

export default FamilyMemberAddLanguages;
