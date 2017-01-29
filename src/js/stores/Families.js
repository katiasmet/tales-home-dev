import {observable, action} from 'mobx';
import {orderBy, filter, startsWith, isEmpty, toUpper, uniq} from 'lodash';

import {selectByProfessional, remove as removeFamily} from '../api/families';
import {selectByFamily as selectFamilyMembers, remove as removeFamilyMembers} from '../api/familymembers';
import {selectByFamily as selectFamilyModels, remove as removeFamilyModels} from '../api/familymodels';
import {content} from '../auth/token';

class Families  {

  @observable isLoading = true;
  allFamilies = [];
  @observable activeFamilies = [];
  @observable characters = [];
  @observable activeCharacter = ``;
  @observable activeFamily = [];

  @action getFamilies = () => {
    this.handleLoading(true);

    selectByProfessional({professionalId: content().sub})
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

  @action handleFamilyInfo = id => {
    //fetch familymembers, results, familymodels, notes from this family
    //familymodelId is gelinked aan results en aan notes
    console.log(id);

    selectFamilyMembers({familyId: id})
    .then(familymembers => {
      this.activeFamily.familymembers = familymembers.familymembers;
    }).catch(err => {
      this.handleError(err);
    });

    selectFamilyModels({familyId: id})
    .then(familymodels => {
      this.activeFamily.familymodels = familymodels.familymodels;
      console.log(this.activeFamily.familymodels);
    }).catch(err => {
      this.handleError(err);
    });


  }

  @action handleFamilySession = id => {
    console.log(id);
  }

  @action handleFamilyRemove = id => {
    removeFamilyMembers({familyId: id})
      .then(() => {
        return removeFamilyModels({familyId: id})
        .then(message => {
          return message;
        }).catch(err => {
          this.handleError(err);
        });
      }).then(() => {
        return removeFamily({id: id})
        .then(() => {
          return `Successfully removed family.`;
        }).catch(err => {
          this.handleError(err);
        });
      }).then(message => {
        console.log(message);
      }).catch(err => {
        this.handleError(err);
      });

  }

  //search through origins, location and name
  //add family
  //remove family
}

export default new Families();
