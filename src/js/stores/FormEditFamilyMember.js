import {observable, action} from 'mobx';
import {find, isEmpty} from 'lodash';

import Form from './Form';
import {select, update} from '../api/familymembers';
import {content} from '../auth/token';
import Families from './Families';
import Languages from './Languages';

class FormEditFamilyMember extends Form {

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
        rule: `min:2`
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
    redirect: ``
  });

  submitButton = ``;
  success = false;

  @action handleSubmitButton = (e, button) => {
    this.submitButton = button;
  }

  @action getFamilyMember = id => {

    this.isLoading = true;

    const {activeFamily} = Families;

    if (isEmpty(activeFamily.familymembers)) {
      select(id)
        .then(familymember => {
          this.activeMember = familymember.familyMember[0];
          this.setValues();
        })
        .catch(err => {
          this.handleError(err);
        });
    } else {

      this.activeMember = find(activeFamily.familymembers, familymember => {
        return familymember._id === id;
      });

      this.setValues();

    }
  }

  setValues = () => {

    this.form.fields.firstName.value = this.activeMember.firstName;
    this.form.fields.character.value = this.activeMember.character;
    this.form.fields.role.value = this.activeMember.role;

    this.form.fields.languages.value = this.activeMember.languages;
    Languages.handleSelectedLanguages(this.activeMember.languages);

    this.isLoading = false;
  }

  @action handleSubmit = e => {
    e.preventDefault();

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Something went wrong.`);
    } else {

      const familymember = this.getValues();
      familymember.familyId = content().sub;

      update(familymember, this.activeMember._id)
        .then(() => {
          this.form.redirect = `families`;
        })
        .catch(error => {
          this.handleError(error.message);
        });
    }

  }
}

export default new FormEditFamilyMember();
