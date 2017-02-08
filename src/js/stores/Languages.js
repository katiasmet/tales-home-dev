import {observable, action} from 'mobx';
import {filter, capitalize} from 'lodash';

import {select} from '../api/languages';
import formAddFamilyMember from './formAddFamilyMember';
import formEditFamilyMember from './formEditFamilyMember';

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
      this.handleCapitalizeLanguages(languages);
      this.isLoading = false;
    }).catch(err => {
      this.handleError(err);
    });

  }

  handleError = error => {
    this.error = error;
  }

  handleCapitalizeLanguages = languages => {
    languages.forEach(language => {
      language.name = capitalize(language.name);
    });

    this.allLanguages = languages;
  }

  @action handleShowLanguages = () => {
    this.showDropDown = !this.showDropDown;
  }

  @action handleSelectLanguage = e => {
    e.preventDefault();

    this.selectedLanguages.push(
      filter(this.allLanguages, language => {
        if (language.nativeName === e.currentTarget.innerHTML) return language;
      })[0]
    );

    this.handleChangeLanguagesInput();
    this.handleShowLanguages();
  }

  @action handleSelectedLanguages = languages => {
    languages.forEach(language => {
      this.selectedLanguages = filter(this.allLanguages, availableLanguage => {
        if (availableLanguage.name === language) return availableLanguage;
      });
    });
  }

  handleChangeLanguagesInput = () => {

    const languages = [];
    this.selectedLanguages.forEach(language => {
      languages.push(language.name);
    });

    formAddFamilyMember.handleChange(`languages`, languages);
    formEditFamilyMember.handleChange(`languages`, languages);

  }

}

export default new Languages();
