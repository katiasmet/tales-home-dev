import React, {PropTypes} from 'react';

const FamilyMemberAddCharacters = ({handleChange, value}) => {

  return (
    <section className='form-characters'>
      <h3 className='label'>Choose your character *</h3>

      <section className='form-characters-options'>
        <input  id='remi'
                className='hidden'
                type='radio'
                name='character'
                value='remi'
                defaultChecked={value === `remi`} />
        <label  htmlFor='remi'
                className='character'
                onClick={() => handleChange(`character`, `remi`)}>
                <span className='character-figure remi'></span>
                <span className='bg-pattern'></span>
        </label>

        <input  id='eddy'
                className='hidden'
                type='radio'
                name='character'
                value='eddy'
                defaultChecked={value === `eddy`} />
        <label  htmlFor='eddy'
                className='character'
                onClick={() => handleChange(`character`, `eddy`)}>
                <span className='character-figure eddy'></span>
                <span className='bg-pattern'></span>
        </label>

        <input  id='kiki'
                className='hidden'
                type='radio'
                name='character'
                value='kiki'
                defaultChecked={value === `kiki`} />
        <label  htmlFor='kiki'
                className='character kiki'
                onClick={() => handleChange(`character`, `kiki`)}>
                <span className='character-figure kiki'></span>
                <span className='bg-pattern'></span>
        </label>

        <input  id='gigi'
                className='hidden'
                type='radio'
                name='character'
                value='gigi'
                defaultChecked={value === `gigi`} />
        <label  htmlFor='gigi'
                className='character gigi'
                onClick={() => handleChange(`character`, `gigi`)}>
                <span className='character-figure gigi'></span>
                <span className='bg-pattern'></span>
        </label>

        <input  id='chris'
                className='hidden'
                type='radio'
                name='character'
                value='chris'
                defaultChecked={value === `chris`} />
        <label  htmlFor='chris'
                className='character chris'
                onClick={() => handleChange(`character`, `chris`)}>
                <span className='character-figure chris'></span>
                <span className='bg-pattern'></span>
        </label>
      </section>

    </section>
  );
};

FamilyMemberAddCharacters.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string
};

export default FamilyMemberAddCharacters;
