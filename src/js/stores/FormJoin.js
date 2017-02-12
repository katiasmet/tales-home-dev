import {observable, action} from 'mobx';
import {find} from 'lodash';

import Form from './Form';
import Users from './Users';

import {familyLogin} from '../api/auth';
import {set} from '../auth/token';

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

      const linkedUser = find(Users.allUsers, user => {
        return user.sessionId === this.getValues().sessionId;
      });

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
