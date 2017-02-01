import {observable, action} from 'mobx';
import Form from './Form';

import {insert} from '../api/families';
import families from './Families';

class FormAddFamily extends Form {

  @observable form = ({
    fields: {
      name: {
        value: ``,
        error: ``,
        rule: `required|min:3`
      },
      origins: {
        value: ``,
        error: ``,
        rule: `string|min:3`
      },
      homeLocation: {
        value: ``,
        error: ``,
        rule: `string|min:3`
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

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Something went wrong.`);
    } else {

      insert(this.getValues())
        .then(family => {
          if (this.submitButton === `start`) families.handleFamilySession(family._id);
          this.form.redirect = `families`;
        })
        .catch(error => {
          this.handleError(error.message);
        });

    }

  }
}

export default new FormAddFamily();
