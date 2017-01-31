import {observable, action} from 'mobx';
import {orderBy, filter, startsWith, isEmpty, toUpper, uniq, includes} from 'lodash';

import {selectByProfessional, remove as removeFamily} from '../api/families';
import {selectByFamily as selectFamilyMembers, remove as removeFamilyMembers} from '../api/familymembers';
import {selectByFamily as selectFamilyModels, remove as removeFamilyModels} from '../api/familymodels';
import {select as selectModel} from '../api/models';
import {content} from '../auth/token';

class Families  {

  @observable isLoading = true;
  @observable allFamilies = [];
  @observable activeFamilies = [];

  @observable characters = [];
  @observable activeCharacter = ``;

  @observable activeFamily = []; //for sessions and getting information (?)
  @observable infoMessage = {};
  @observable showInfo = ``;
  @observable isLoadingInfo = true;

  @observable searchInput = ``;

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

    this.activeFamily = [];
    this.isLoadingInfo = true;
    this.infoMessage = {};

    if (!this.showInfo) {
      selectFamilyMembers({familyId: id})
      .then(familymembers => {
        if (isEmpty(familymembers.familyMembers)) {
          this.infoMessage.members = `This family did not add any family members yet.`;
          this.isLoadingInfo = false;
        }
        this.activeFamily.familymembers = familymembers.familyMembers;
      }).catch(err => {
        this.handleError(err);
      });

      selectFamilyModels({familyId: id})
      .then(familymodels => {
        if (isEmpty(familymodels.familyModels)) {
          this.infoMessage.models = `This family did not join a session yet.`;
          this.isLoadingInfo = false;
        }
        this.activeFamily.familymodels = familymodels.familyModels;
      }).then(() => {

        if (!isEmpty(this.activeFamily.familymodels)) {
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
        }

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
    .catch(err => {
      this.handleError(err);
    });

    removeFamilyModels({familyId: id})
    .catch(err => {
      this.handleError(err);
    });

    removeFamily({id: id})
    .then(() => {
      this.allFamilies = filter(this.allFamilies, family => {
        return family._id !== id;
      });

      this.handleCharacters();
      this.handleActiveFamilies();
    }).catch(err => {
      this.handleError(err);
    });

  }

  @action handleSearch = (field, value) => {
    this.searchInput = value;

    if (value) {
      this.activeFamilies = filter(this.allFamilies, family => {
        if (includes(toUpper(family.name), toUpper(value)) ||
            includes(toUpper(family.origins), toUpper(value)) ||
            includes(toUpper(family.homeLocation), toUpper(value))
        ) {
          return family;
        }
      });
    } else {
      this.handleActiveFamilies();
    }


  }

  //search through origins, location and name
}

export default new Families();
