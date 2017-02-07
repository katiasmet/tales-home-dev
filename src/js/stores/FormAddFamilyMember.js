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
    redirect: false
  });


  @action handleSubmit = e => {
    e.preventDefault();

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Something went wrong.`);
    } else {

      const familymember = this.getValues();
      familymember.familyId = content().sub;

      insert(familymember)
        .then(() => {
          this.form.redirect = true;
        })
        .catch(error => {
          this.handleError(error.message);
        });
    }

  }
}

export default new FormAddFamilyMember();
