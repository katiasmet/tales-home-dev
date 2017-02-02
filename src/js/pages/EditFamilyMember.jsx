import React, {PropTypes, Component} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header, Loading} from '../components/';
import {FamilyMemberAdd} from '../components/family/';
import {getUrlParameter} from '../util/getUrlParameter';

@inject(`languages`, `formEditFamilyMember`)
@observer
class EditFamilyMember extends Component {

  componentDidMount() {
    const {allLanguages, getLanguages} = this.props.languages;
    if (isEmpty(allLanguages)) getLanguages();

    const {getFamilyMember} = this.props.formEditFamilyMember;
    console.log(getUrlParameter(`id`));
    console.log(location.search);

    getFamilyMember(getUrlParameter(`id`));
  }

  render() {

    const {form, handleChange, handleSubmit, isLoading} = this.props.formEditFamilyMember;

    return (
      <div className='page page-edit-family-member'>
        <Header />

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
  formEditFamilyMember: PropTypes.shape({
    isLoading: PropTypes.bool,
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
  })
};

export default EditFamilyMember;
