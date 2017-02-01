import {observable, action} from 'mobx';

import {select} from '../api/languages';

class Languages  {

  @observable isLoading = true;
  @observable allLanguages = [];
  error = ``;
  @observable showDropDown = false;


  @action getLanguages = (showDropDown = false) => {
    this.isLoading = true;
    this.showDropDown = showDropDown;

    console.log(`get languages`);

    select()
    .then(languages => {
      console.log(`get them`);
      console.log(languages);
      this.allLanguages = languages;
      this.isLoading = false;
    }).catch(err => {
      this.handleError(err);
    });

  }

  handleError = error => {
    this.error = error;
  }

}

export default new Languages();
