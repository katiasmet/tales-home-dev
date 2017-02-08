import {observable, action} from 'mobx';
import Form from './Form';

import {login} from '../api/auth';
import {update} from '../api/users';
import {set, content} from '../auth/token';

class FormLogin extends Form {
  @observable form = ({
    fields: {
      email: {
        value: ``,
        error: ``,
        rule: `required|email`
      },
      password: {
        value: ``,
        error: ``,
        rule: `required|min:3`
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
      this.handleError(`Oops! Looks like your e-mail or password isn't correct.`);
    } else {

      login(this.getValues())
        .then(d => set(d))
        .then(() => {
          this.form.redirect = true;
        })
        .catch(error => {
          this.handleError(error.message);
        });

      update({firstLogin: false}, content().sub)
        .catch(error => {
          this.handleError(error.message);
        });
    }

  }
}

export default new FormLogin();
