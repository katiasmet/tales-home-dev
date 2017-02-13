import {observable, action} from 'mobx';
import Form from './Form';

import {insert} from '../api/families';

class FormAddFamily extends Form {

  @observable form = ({
    fields: {
      name: {
        value: ``,
        error: ``,
        rule: `required|min:2`
      },
      origins: {
        value: ``,
        error: ``,
        rule: `string`
      },
      homeLocation: {
        value: ``,
        error: ``,
        rule: `string`
      }
    },
    meta: {
      isValid: false,
      error: ``
    },
    redirect: ``
  });

  submitButton = ``;
  startSession = ``;

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

          this.form.redirect = `families`;
          if (this.submitButton === `start`) this.startSession = family._id;

        })
        .catch(error => {
          this.handleError(error.message);
        });

    }

  }
}

export default new FormAddFamily();
