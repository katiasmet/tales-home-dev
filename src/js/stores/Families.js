import {observable, action} from 'mobx';
import {orderBy, filter, startsWith, isEmpty, toUpper, uniq} from 'lodash';

import {selectByProfessionalId} from '../api/families';
import {content} from '../auth/token';

class Families  {

  @observable isLoading = true;
  allFamilies = [];
  @observable activeFamilies = [];
  @observable characters = [];
  @observable activeCharacter = ``;

  @action getFamilies = () => {
    this.handleLoading(true);

    selectByProfessionalId({professionalId: content().sub})
      .then(data => {
        this.allFamilies = data.families;
        this.orderFamilies();
        this.handleCharacters();
      }).then(() => {
        this.handleActiveFamilies();
        this.handleLoading(false);
      }).catch(err => {
        this.handleError(err);
      });
  }

  handleError = error => {
    this.error = error;
  }

  handleLoading = isLoading => {
    this.isLoading = isLoading;
  }

  handleCharacters = () => {
    const characters = [];

    this.allFamilies.forEach(family => {
      const character = toUpper(family.name.charAt(0));
      characters.push(character);
    });

    this.characters = uniq(characters);
    this.characters = this.characters.sort();
    if (!isEmpty(this.characters)) this.activeCharacter = this.characters[0];
  }

  handleActiveFamilies = () => {

    this.activeFamilies = filter(
      this.allFamilies,
      family => {
        return startsWith(toUpper(family.name), this.activeCharacter);
      }
    );

  }

  orderFamilies = () => {
    this.allFamilies = orderBy(this.allFamilies, [`name`], [`asc`]);
  }

  @action handleActiveCharacter = e => {
    const character = e.currentTarget.innerHTML;
    this.activeCharacter = character;

    this.handleActiveFamilies();
  }

  /*handleFamilyInfo = id => {
    //fetch familymembers, results, familymodels, notes from this family

  }

  handleRemoveFamily = id => {
    //remove members, result, family, familymodels, notes
  }*/

  //search through origins, location and name
  //add family
  //remove family
}

export default new Families();
