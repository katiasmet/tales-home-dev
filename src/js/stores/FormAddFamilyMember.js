import {observable, action} from 'mobx';
import Form from './Form';

import {insert} from '../api/familymembers';
import {content} from '../auth/token';

class FormAddFamilyMember extends Form {

  @observable form = ({
    fields: {
      firstName: {
        value: ``,
        error: ``,
        rule: `required|min:3`
      },
      languages: {
        value: ``,
        error: ``,
        rule: ``
      },
      character: {
        value: ``,
        error: ``,
        rule: `required|min:3`
      },
      role: {
        value: ``,
        error: ``,
        rule: `required|min:3`
      }
    },
    meta: {
      isValid: false,
      error: ``
    },
    redirect: ``
  });

  submitButton = ``;

  @action handleSubmitButton = (e, button) => {
    this.submitButton = button;
  }

  @action handleSubmit = e => {
    e.preventDefault();

    console.log(e);

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Something went wrong.`);
    } else {

      console.log(this.getValues());

      /*insert(this.getValues())
        .then(() => {
          this.form.redirect = `family`;
        })
        .catch(error => {
          this.handleError(error.message);
        });*/

    }

  }
}

export default new FormAddFamilyMember();
