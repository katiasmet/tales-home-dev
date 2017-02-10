import React, {PropTypes} from 'react';
import {isEmpty} from 'lodash';

const FamilyMemberAddRoles = ({handleChange, value, character}) => {

  console.log(value);

  return (
    <section className='form-roles'>
      <h3 className='label'>What's your role within the family? *</h3>

      <section className='form-roles-options'>

        <span>
          <input  id='father'
                  className='hidden'
                  type='radio'
                  name='role'
                  value='father'
                  defaultChecked={value === `father`} />
          <label  htmlFor='father'
                  className='role'
                  onClick={() => handleChange(`role`, `father`)}>
                  <span className={!isEmpty(character) ? `role-figure father ${character}` : `role-figure father`}></span>
                  <span className='bg-pattern'></span>
          </label>
          <label  htmlFor='father'
                  onClick={() => handleChange(`role`, `father`)}>
                  Father
          </label>
        </span>

        <span>
          <input  id='child'
                  className='hidden'
                  type='radio'
                  name='role'
                  value='child'
                  defaultChecked={value === `child`} />
          <label  htmlFor='child'
                  className='role'
                  onClick={() => handleChange(`role`, `child`)}>
                  <span className={!isEmpty(character) ? `role-figure child ${character}` : `role-figure child`}></span>
                  <span className='bg-pattern'></span>
          </label>
          <label  htmlFor='child'
                  onClick={() => handleChange(`role`, `child`)}>
                  Child
          </label>
        </span>

        <span>
          <input  id='mother'
                  className='hidden'
                  type='radio'
                  name='role'
                  value='mother'
                  defaultChecked={value === `mother`} />
          <label  htmlFor='mother'
                  className='role'
                  onClick={() => handleChange(`role`, `mother`)}>
                  <span className={!isEmpty(character) ? `role-figure mother ${character}` : `role-figure mother`}></span>
                  <span className='bg-pattern'></span>
          </label>
          <label  htmlFor='mother'
                  onClick={() => handleChange(`role`, `mother`)}>
                  Mother
          </label>
        </span>

      </section>

    </section>
  );
};

FamilyMemberAddRoles.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
  character: PropTypes.string
};

export default FamilyMemberAddRoles;
