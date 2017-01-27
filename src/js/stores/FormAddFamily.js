import {observable, action} from 'mobx';
import Form from './Form';

import {insert} from '../api/families';

class FormUser extends Form {

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
    redirect: false
  });

  @action handleSubmit = e => {
    e.preventDefault();

    console.log(e);

    //save or play ?

    if (!this.form.meta.isValid) {
      this.handleError(`Oops! Something went wrong.`);
    } else {

      insert(this.getValues())
        .then(f => console.log(`add family in family array`))
        .then(() => {
          this.form.redirect = true;
        })
        .catch(error => {
          this.handleError(error.message);
        });

    }

  }
}

export default new FormUser();
