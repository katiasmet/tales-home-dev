import {observable, action} from 'mobx';
import Form from './Form';

import {update} from '../api/users';
import {set, content} from '../auth/token';

class FormEdit extends Form {

  @observable form = ({
    fields: {
      name: {
        value: content().name,
        error: ``,
        rule: `required|min:3`
      },
      email: {
        value: content().email,
        error: ``,
        rule: `required|email`
      },
      password: {
        value: ``,
        error: ``,
        rule: `required|min:3`
      },
      newpassword: {
        value: ``,
        error: ``,
        rule: `min:3`
      },
      organisation: {
        value: this.getOrganisation(),
        error: ``,
        rule: `string`
      }
    },
    meta: {
      isValid: false,
      error: ``
    },
    success: ``
  });

  getOrganisation = () => {
    if (content().organisation) {
      return content().organisation;
    }
    return ``;
  }

  @action handleSubmit = e => {
    e.preventDefault();

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Looks like password isn't correct.`);
    } else {

      update(this.getValues())
        .then(t => set(t.token))
        .then(() => {
          this.form.success = `High five! Your profile is successfully updated.`;
        })
        .catch(error => {
          this.handleError(error.message);
        });

    }

  }
}

export default new FormEdit();
