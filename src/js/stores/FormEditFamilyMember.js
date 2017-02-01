import {observable, action} from 'mobx';
import {filter, isEmpty} from 'lodash';

import Form from './Form';
import {select, update} from '../api/familymembers';
import {content} from '../auth/token';
import families from './Families';
import languages from './Languages';
import {getUrlParameter} from '../util/getUrlParameter';

class FormAddFamilyMember extends Form {

  error = ``;
  @observable activeMember = {
    firstName: ``,
    languages: [],
    character: ``,
    role: ``
  };
  @observable isLoading = true;
  @observable form = ({
    fields: {
      firstName: {
        value: ``,
        error: ``,
        rule: `min:3`
      },
      languages: {
        value: [],
        error: ``,
        rule: `array`
      },
      character: {
        value: ``,
        error: ``,
        rule: `min:3`
      },
      role: {
        value: ``,
        error: ``,
        rule: `min:3`
      }
    },
    meta: {
      isValid: true,
      error: ``
    },
    redirect: false
  });

  @action getFamilyMember = id => {

    this.isLoading = true;

    const {activeFamily} = families;

    if (isEmpty(activeFamily.familymembers)) {
      select(id)
        .then(familymember => {
          this.activeMember = familymember.familyMember[0];
          this.setValues();
        })
        .catch(err => {
          this.handleFormError(err);
        });
    } else {

      this.activeMember = filter(activeFamily.familymembers, familymember => {
        return familymember._id === id;
      })[0];

      this.setValues();

    }
  }

  handleFormError = error => {
    this.error = error;
  }

  setValues = () => {

    console.log(this.activeMember);

    this.form.fields.firstName.value = this.activeMember.firstName;
    this.form.fields.character.value = this.activeMember.character;
    this.form.fields.role.value = this.activeMember.role;

    this.form.fields.languages.value = this.activeMember.languages;
    languages.handleSelectedLanguages(this.activeMember.languages);

    this.isLoading = false;
  }

  @action handleSubmit = e => {
    e.preventDefault();

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Something went wrong.`);
    } else {

      const familymember = this.getValues();
      familymember.familyId = content().sub;

      update(familymember, getUrlParameter(`id`))
        .then(() => {
          this.form.redirect = true;
        })
        .catch(error => {
          this.handleError(error.message);
        });
    }

  }
}

export default new FormAddFamilyMember();