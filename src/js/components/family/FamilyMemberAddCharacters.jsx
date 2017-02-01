import React from 'react';

const FamilyMemberAddCharacters = ({handleChange}) => {

  return (
    <section className='form-characters'>
      <h3 className='label'>Choose your character</h3>

      <label  htmlFor='charactername-1'
              className='charactername-1'
              onClick={() => handleChange(`character`, `character-name-1`)}>
              charactername 1
      </label>
      <input  id='charactername-1'
              className='hidden'
              type='radio'
              name='character'
              value='charactername-1' />

      <label  htmlFor='charactername-2'
              className='charactername-2'
              onClick={() => handleChange(`character`, `character-name-2`)}>
              charactername 2
      </label>
      <input  id='charactername-2'
              className='hidden'
              type='radio'
              name='character'
              value='charactername-2' />

      <label  htmlFor='charactername-3'
              className='charactername-3'
              onClick={() => handleChange(`character`, `character-name-3`)}>
              charactername 3
      </label>
      <input  id='charactername-3'
              className='hidden'
              type='radio'
              name='character'
              value='charactername-3' />

    </section>
  );
};

export default FamilyMemberAddCharacters;
