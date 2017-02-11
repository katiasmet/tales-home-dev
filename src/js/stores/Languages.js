import {observable, action} from 'mobx';
import {filter, capitalize, toUpper, includes} from 'lodash';

import {select} from '../api/Languages';
import FormAddFamilyMember from './FormAddFamilyMember';
import FormEditFamilyMember from './FormEditFamilyMember';
import Models from './Models';

class Languages  {

  @observable isLoading = true;
  @observable allLanguages = [];
  @observable availableLanguages = [];
  error = ``;
  @observable showDropDown = false;
  @observable selectedLanguages = [];
  @observable searchInput = ``;


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
    this.availableLanguages = this.allLanguages;
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

    FormAddFamilyMember.handleChange(`languages`, languages);
    FormEditFamilyMember.handleChange(`languages`, languages);

  }

  @action handleSearch = (field, value) => {
    this.searchInput = value;

    if (value) {
      this.availableLanguages = filter(this.allLanguages, language => {
        if (includes(toUpper(language.name), toUpper(value)) ||
            includes(toUpper(language.nativeName), toUpper(value))
        ) {
          return language;
        }
      });
    } else {
      this.availableLanguages = this.allLanguages;
    }

  }

  @action handleFamilyLanguages = languages => {

    const familyLanguages = [];

    languages.forEach(language => {
      const familyLanguage = filter(this.allLanguages, availableLanguage => {
        return availableLanguage.name === language;
      })[0];

      if (familyLanguage) familyLanguages.push(familyLanguage.nativeName);
    });

    Models.familyLanguages = familyLanguages;
  }

}

export default new Languages();
