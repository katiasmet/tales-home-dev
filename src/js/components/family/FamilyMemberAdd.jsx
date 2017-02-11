import React, {Component, PropTypes}  from 'react';
import {Redirect, Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FormInput} from '../';
import {FamilyMemberAddCharacters, FamilyMemberAddLanguages, FamilyMemberAddRoles} from './';

@inject(`formEditFamilyMember`, `formAddFamilyMember`) @observer
class FamilyMemberAdd extends Component {

  componentDidMount() {
    const {edit} = this.props;
    if (edit) this.formMember = this.props.formEditFamilyMember;
    else this.formMember = this.props.formAddFamilyMember;
  }

  render() {
    const {edit} = this.props;
    const {form, handleChange, handleSubmit} = this.formMember;
    const {fields, meta, redirect} = form;

    console.log(fields.firstName);
    console.log(fields);
    console.log(`family member add`);

    return (

      <section className='form form-add-family-member'>

        {
          redirect && <Redirect to={`/family`} />
        }

        {
          edit ? <h1>Edit a family member</h1>
          : <h1>Add a new family member</h1>
        }

        <form
          action=''
          method='post'
          acceptCharset='utf-8'
          onSubmit={handleSubmit}>

          <fieldset>

            <FamilyMemberAddCharacters handleChange={handleChange} value={fields.character.value} />

            <FormInput
              id='familymember-form-firstname'
              label='First name'
              name='firstName'
              value={fields.firstName.value}
              error={fields.firstName.error}
              onChange={handleChange}
              placeholder='f.e. Harry' />

            <FamilyMemberAddRoles handleChange={handleChange} value={fields.role.value} character={fields.character.value} />

            <FamilyMemberAddLanguages />

            {!isEmpty(meta.error) && <div className='error'>{meta.error}</div>}

            <div className='form-actions'>
                <Link to='/family' className='btn'>
                  <i className='fa fa-close'></i>
                </Link>
                <button type='submit' className='btn'><i className='fa fa-play'></i></button>
            </div>

          </fieldset>

        </form>
      </section>
    );
  }

}

FamilyMemberAdd.propTypes = {
  formAddFamilyMember: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    form: PropTypes.shape({
      fields: PropTypes.objectOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        error: PropTypes.any,
      })).isRequired,
      meta: PropTypes.shape({
        isValid: PropTypes.bool.isRequired,
        error: PropTypes.any
      }).isRequired,
      redirect: PropTypes.bool
    })
  }),
  formEditFamilyMember: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    form: PropTypes.shape({
      fields: PropTypes.objectOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        error: PropTypes.any,
      })).isRequired,
      meta: PropTypes.shape({
        isValid: PropTypes.bool.isRequired,
        error: PropTypes.any
      }).isRequired,
      redirect: PropTypes.bool
    })
  }),
  edit: PropTypes.bool
};

export default FamilyMemberAdd;
