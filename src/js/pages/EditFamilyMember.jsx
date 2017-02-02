import React, {PropTypes, Component} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header, Loading} from '../components/';
import {FamilyMemberAdd} from '../components/family/';

@inject(`languages`, `formEditFamilyMember`)
@observer
class EditFamilyMember extends Component {

  componentWillMount() {
    const {resetRedirect} = this.props.formEditFamilyMember;
    resetRedirect();
  }

  componentDidMount() {
    const {allLanguages, getLanguages} = this.props.languages;
    if (isEmpty(allLanguages)) getLanguages();

    const {getFamilyMember} = this.props.formEditFamilyMember;
    getFamilyMember(this.props.match.params.id);
  }

  render() {

    const {form, handleChange, handleSubmit, isLoading} = this.props.formEditFamilyMember;
    const {pathname} = this.props.location;

    return (
      <div className='page page-edit-family-member'>
        <Header pathname={pathname} />

        <main>
          <h1>Edit a family member</h1>

          {
            isLoading ? <Loading />
            : <FamilyMemberAdd form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
          }

        </main>
      </div>

    );
  }

}

EditFamilyMember.propTypes = {
  languages: PropTypes.shape({
    allLanguages: PropTypes.array,
    getLanguages: PropTypes.func
  }),
  match: PropTypes.object,
  formEditFamilyMember: PropTypes.shape({
    isLoading: PropTypes.bool,
    resetRedirect: PropTypes.func,
    getFamilyMember: PropTypes.func,
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
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default EditFamilyMember;
