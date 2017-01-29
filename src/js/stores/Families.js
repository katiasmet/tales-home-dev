import {observable, action} from 'mobx';
import {orderBy, filter, startsWith, isEmpty, toUpper, uniq} from 'lodash';

import {selectByProfessional, remove as removeFamily} from '../api/families';
import {selectByFamily as selectFamilyMembers, remove as removeFamilyMembers} from '../api/familymembers';
import {selectByFamily as selectFamilyModels, remove as removeFamilyModels} from '../api/familymodels';
import {select as selectModel} from '../api/models';
import {content} from '../auth/token';

class Families  {

  @observable isLoading = true;
  allFamilies = [];
  @observable activeFamilies = [];

  @observable characters = [];
  @observable activeCharacter = ``;

  @observable activeFamily = [];
  @observable showInfo = ``;
  @observable isLoadingInfo = true;

  @action getFamilies = () => {
    this.isLoading = true;

    selectByProfessional({professionalId: content().sub})
      .then(data => {
        this.allFamilies = data.families;
        this.orderFamilies();
        this.handleCharacters();
      }).then(() => {
        this.handleActiveFamilies();
        this.isLoading = false;
      }).catch(err => {
        this.handleError(err);
      });
  }

  handleError = error => {
    this.error = error;
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

    this.isLoadingInfo = true;

    if (!this.showInfo) {
      selectFamilyMembers({familyId: id})
      .then(familymembers => {
        this.activeFamily.familymembers = familymembers.familyMembers;
      }).catch(err => {
        this.handleError(err);
      });

      selectFamilyModels({familyId: id})
      .then(familymodels => {
        this.activeFamily.familymodels = familymodels.familyModels;
      }).then(() => {

        this.activeFamily.familymodels.forEach((familymodel, i) => {

          selectModel(familymodel.modelId)
          .then(model => {
            familymodel.name = model.model[0].name;
          })
          .then(() => {
            if ((i + 1) === this.activeFamily.familymodels.length) this.isLoadingInfo = false;
          })
          .catch(err => {
            this.handleError(err);
          });



        });

      }).then(() => {
        this.showInfo = id;
      }).catch(err => {
        this.handleError(err);
      });

    } else {
      this.activeFamily = [];
      this.showInfo = ``;
    }
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
}

export default new Families();
