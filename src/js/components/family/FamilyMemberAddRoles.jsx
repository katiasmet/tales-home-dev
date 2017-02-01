import React from 'react';

const FamilyMemberAddRoles = ({handleChange}) => {

  return (
    <section className='form-roles'>
      <h3 className='label'>What's your role within the family?</h3>

      <label  htmlFor='father'
              className='father'
              onClick={() => handleChange(`role`, `father`)}>
              father
      </label>
      <input  id='father'
              className='hidden'
              type='radio'
              name='role'
              value='father' />

      <label  htmlFor='child'
              className='father'
              onClick={() => handleChange(`role`, `child`)}>
              child
      </label>
      <input  id='child'
              type='radio'
              name='role'
              value='child' />

      <label  htmlFor='mother'
              className='mother'
              onClick={() => handleChange(`role`, `mother`)}>
              mother
      </label>
      <input  id='mother'
              type='radio'
              name='role'
              value='mother' />

    </section>
  );
};

export default FamilyMemberAddRoles;
