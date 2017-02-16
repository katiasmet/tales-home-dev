import React, {Component, PropTypes}  from 'react';
import {Redirect, Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {FormInput} from '../';
import {FamilyMemberAddCharacters, FamilyMemberAddLanguages, FamilyMemberAddRoles} from './';

@inject(`formEditFamilyMember`, `formAddFamilyMember`) @observer
class FamilyMemberAdd extends Component {

  render() {
    const {edit} = this.props;

    if (edit) this.formMember = this.props.formEditFamilyMember;
    else this.formMember = this.props.formAddFamilyMember;

    const {form, handleChange, handleSubmit, success} = this.formMember;
    const {handleSubmitButton} = this.formMember;
    const {fields, meta, redirect} = form;

    return (

      <section className='form form-add-family-member'>

        <Link to='/family' className='btn btn-close'>
          <i className='fa fa-close'></i>
        </Link>

        {
          (!isEmpty(redirect)) && <Redirect to={`/${redirect}`} />
        }

        {
          edit ? <h1>Edit a family member</h1>
          : <h1>Add a new family member</h1>
        }

        {
          success && (
            <section className='info info-success'>
              <p>High five! You added a new family member. Let&#39;s add another one.</p>
            </section>
          )
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
                <button type='submit' className='btn' disabled={!meta.isValid} onClick={e => handleSubmitButton(e, `save`)}><i className='fa fa-save'></i></button>
            </div>

          </fieldset>

        </form>
      </section>
    );
  }

}

/*{
  (!edit) && <button type='submit' className='btn' disabled={!meta.isValid} onClick={e => handleSubmitButton(e, `next`)}><i className='fa fa-plus'></i></button>
}*/

FamilyMemberAdd.propTypes = {
  formAddFamilyMember: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleSubmitButton: PropTypes.func,
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
      redirect: PropTypes.string
    })
  }),
  edit: PropTypes.bool
};

export default FamilyMemberAdd;
