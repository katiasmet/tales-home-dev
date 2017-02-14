import {observable, action} from 'mobx';
import Form from './Form';

import {login} from '../api/auth';
import {insert as register} from '../api/users';
import {set} from '../auth/token';

class FormRegister extends Form {
  @observable form = ({
    fields: {
      name: {
        value: ``,
        error: ``,
        rule: `required|min:2`
      },
      email: {
        value: ``,
        error: ``,
        rule: `required|email`
      },
      password: {
        value: ``,
        error: ``,
        rule: `required|min:3`
      },
      organisation: {
        value: ``,
        error: ``,
        rule: `string`
      }
    },
    meta: {
      isValid: false,
      error: ``
    },
    redirect: false
  });

  @action handleSubmit = e => {
    e.preventDefault();

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Looks like something went wrong with the registration.`);
    } else {

      register(this.getValues())
        .then(() => login(this.getValues()))
        .then(t => set(t))
        .then(() => {
          this.form.redirect = true;
        })
        .catch(error => {
          this.handleError(error.message);
        });

    }

  }
}

export default new FormRegister();
