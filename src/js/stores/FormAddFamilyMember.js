import {observable, action} from 'mobx';

import Form from './Form';
import {insert} from '../api/familymembers';
import {content} from '../auth/token';
import Languages from './Languages';
import Families from './Families';

class FormAddFamilyMember extends Form {

  @observable form = ({
    fields: {
      firstName: {
        value: ``,
        error: ``,
        rule: `required|min:2`
      },
      languages: {
        value: ``,
        error: ``,
        rule: `required|array`
      },
      character: {
        value: `kiki`,
        error: ``,
        rule: `required|min:3`
      },
      role: {
        value: `child`,
        error: ``,
        rule: `required|min:3`
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

  @action handleEmptyValues = () => {
    this.form.fields.firstName.value = ``;
    this.form.fields.languages.value = ``;
    this.form.fields.character.value = `kiki`;
    this.form.fields.role.value = `child`;
    Languages.selectedLanguages = [];
    this.form.meta.error = ``;
  }


  @action handleSubmit = e => {
    e.preventDefault();

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Something went wrong.`);
    } else {

      const familymember = this.getValues();
      familymember.familyId = content().sub;

      insert(familymember)
        .then(familymember => {
          if (this.submitButton === `save`) {
            this.form.redirect = `families`;
          } else {
            this.form.redirect = `newfamilymember`;
            this.success = true;
            this.handleEmptyValues();
          }

          Families.activeFamily.familymembers.push(familymember);
        })
        .catch(error => {
          this.handleError(error.message);
        });
    }

  }
}

export default new FormAddFamilyMember();
