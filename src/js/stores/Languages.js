import {observable, action} from 'mobx';
import {filter} from 'lodash';

import {select} from '../api/languages';

class Languages  {

  @observable isLoading = true;
  @observable allLanguages = [];
  error = ``;
  @observable showDropDown = false;
  @observable selectedLanguages = [];


  @action getLanguages = () => {

    this.isLoading = true;

    select()
    .then(languages => {
      this.allLanguages = languages;
      this.isLoading = false;
    }).catch(err => {
      this.handleError(err);
    });

  }

  handleError = error => {
    this.error = error;
  }

  @action handleShowLanguages = () => {
    this.showDropDown = !this.showDropDown;
  }

  @action handleSelectLanguage = e => {
    e.preventDefault();

    this.selectedLanguages.push(
      filter(this.allLanguages, language => {
        return language.name === e.currentTarget.innerHTML;
      })
    );

    console.log(this.selectedLanguages);
  }

}

export default new Languages();
