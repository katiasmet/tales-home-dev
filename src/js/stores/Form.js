import {action, toJS} from 'mobx';
import Validator from 'validatorjs';

class Form {

  @action handleChange = (field, value) => {

    console.log(`handle change`);

    this.form.fields[field].value = value;
    const validation = new Validator(
      this.getValues(`value`),
      this.getValues(`rule`));
    this.form.meta.isValid = validation.passes();

    if (validation.errors.first(field)) {
      this.form.fields[field].error = validation.errors.first(field);
    } else {
      this.form.fields[field].error = ``;
    }

  };

  getValues = valueKey => {
    const data = {};
    const form = toJS(this.form).fields;

    Object.keys(form).map(key => {
      if (valueKey) {
        data[key] = form[key][valueKey];
      } else {
        data[key] = form[key].value;
      }
    });

    return data;
  };

  @action handleError = error => {
    this.form.meta.error = error;
  }

  @action resetRedirect = () => {
    this.form.redirect = false;
  }

}

export default Form;
