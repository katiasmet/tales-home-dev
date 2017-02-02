import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header} from '../components/';
import {FamilyMemberAdd} from '../components/family/';

@inject(`languages`, `formAddFamilyMember`)
@observer
class NewFamilyMember extends Component {

  componentWillMount() {
    const {resetRedirect} = this.props.formAddFamilyMember;
    resetRedirect();
  }

  componentDidMount() {
    const {allLanguages, getLanguages} = this.props.languages;
    if (isEmpty(allLanguages)) getLanguages();
  }

  render() {

    const {form, handleChange, handleSubmit} = this.props.formAddFamilyMember;

    return (
      <div className='page page-new-family-member'>
        <Header />

        <main>
          <h1>Add a new family member</h1>
          <FamilyMemberAdd form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
        </main>
      </div>

    );
  }

}

NewFamilyMember.propTypes = {
  languages: PropTypes.shape({
    allLanguages: PropTypes.array,
    getLanguages: PropTypes.func
  }),
  formAddFamilyMember: PropTypes.shape({
    resetRedirect: PropTypes.func.isRequired,
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

export default NewFamilyMember;
