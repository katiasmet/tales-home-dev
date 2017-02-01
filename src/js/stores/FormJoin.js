import {observable, action} from 'mobx';
import {filter} from 'lodash';

import Form from './Form';
import users from './Users';
// import families from './Families';

import {familyLogin} from '../api/auth';
import {set} from '../auth/token';
// content

class FormJoin extends Form {
  @observable form = ({
    fields: {
      sessionId: {
        value: ``,
        error: ``,
        rule: `required|numeric|min:4`
      },
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
      this.handleError(`Oops! Looks like your family code isn't correct.`);
    } else {

      const linkedUser = filter(users.allUsers, user => {
        return user.sessionId === this.getValues().sessionId;
      })[0];

      if (linkedUser) {
        familyLogin({familyId: linkedUser.familyId})
          .then(d => set(d))
          .then(() => {
            this.form.redirect = true;
          })
          .catch(error => {
            this.handleError(error.message);
          });
      } else {
        this.handleError(`Oops! Looks like your family code isn't correct.`);
      }

    }

  }
}

export default new FormJoin();
