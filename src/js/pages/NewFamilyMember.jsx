import React, {Component, PropTypes} from 'react';
import {inject, observer} from 'mobx-react';
import {isEmpty} from 'lodash';

import {Header} from '../components/';
import {FamilyMemberAdd} from '../components/family/';
import {FamilyBg} from '../components/illustrations';

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

    const {handleEmptyValues} = this.props.formAddFamilyMember;
    handleEmptyValues();
  }

  render() {

    const {pathname} = this.props.location;

    return (
      <div className='page page-new-family-member'>
        <FamilyBg />

        <Header pathname={pathname} />

        <main>
          <FamilyMemberAdd edit={false} />
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
    handleEmptyValues: PropTypes.func,
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
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default NewFamilyMember;
