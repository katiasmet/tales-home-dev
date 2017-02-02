import {observable, action} from 'mobx';
import io from 'socket.io-client';
import {orderBy, filter, startsWith, isEmpty, toUpper, uniq, includes, toString} from 'lodash';

import {selectByProfessional, remove as removeFamily} from '../api/families';
import {selectByFamily as selectFamilyMembers, remove as removeFamilyMembers} from '../api/familymembers';
import {selectByFamily as selectFamilyModels, remove as removeFamilyModels} from '../api/familymodels';
import {select as selectModel} from '../api/models';
import {content} from '../auth/token';

import users from './Users';

class Families  {

  socket = io(`/`);

  @observable isLoading = ``;
  @observable allFamilies = [];
  error = ``;
  @observable activeFamilies = [];

  @observable characters = [];
  @observable activeCharacter = ``;

  @observable activeFamily = {
    _id: ``,
    name: ``,
    origins: ``,
    homeLocation: ``,
    familymembers: {},
    familymodels: {}
  }; //for sessions and getting information (?)
  @observable infoMessage = {};
  @observable showInfo = ``;

  @observable searchInput = ``;
  @observable sessionId = ``;
  @observable confirmation = false;

  @action getFamilies = () => {
    this.isLoading = `families`;

    selectByProfessional({professionalId: content().sub})
      .then(data => {
        this.allFamilies = data.families;
        this.orderFamilies();
        this.handleCharacters();
      }).then(() => {
        this.handleActiveFamilies();
        this.isLoading = ``;
      }).catch(err => {
        this.handleError(err);
      });
  }

  @action getFamilyMembers = (familyId, familySide = false) => {
    this.isLoading = `familymembers`;

    selectFamilyMembers({familyId: familyId})
    .then(familymembers => {
      if (isEmpty(familymembers.familyMembers)) {
        this.infoMessage.members = `This family did not add any family members yet.`;
        this.isLoading = ``;
      }
      this.activeFamily.familymembers = familymembers.familyMembers;
      if (familySide) this.isLoading = ``;
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

  @action handleFamilyInfo = (id, showInfo = true) => {

    this.activeFamily = {};
    this.isLoading = `info`;
    this.infoMessage = {};

    this.findActiveFamily(id);

    if (!this.showInfo) {
      this.getFamilyMembers(id);

      selectFamilyModels({familyId: id})
      .then(familymodels => {
        if (isEmpty(familymodels.familyModels)) {
          this.infoMessage.models = `This family did not join a session yet.`;
          this.isLoading = ``;
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
              if ((i + 1) === this.activeFamily.familymodels.length) this.isLoading = ``;
            })
            .catch(err => {
              this.handleError(err);
            });

          });
        }

      }).then(() => {
        if (showInfo) this.showInfo = id;
      }).catch(err => {
        this.handleError(err);
      });

    } else {
      this.activeFamily = {};
      this.showInfo = ``;
    }
  }

  findActiveFamily = id => {

    this.activeFamily = filter(this.allFamilies, family => {
      return family._id === id;
    })[0];

  };

  @action handleFamilySession = familyId => {

    this.generateSessionId();
    this.handleFamilyInfo(familyId, false);
    this.isLoading = `session`;


    this.socket.emit(`setSession`, users.currentSocketId, familyId, this.sessionId);

  }

  generateSessionId = () => {

    const sessionId = toString(Math.floor(1000 + Math.random() * 9000));

    if (this.checkInUse(sessionId)) this.sessionId = sessionId;
    else this.generateSessionId();

  }

  checkInUse = sessionId => {
    const used = filter(users.allUsers, user => {
      return user.sessionId === sessionId;
    });

    if (used.length === 0) return true;
    else return false;
  }

  @action handleStartSession = () => {

    console.log(`handle start session`);
    const familyId = content().sub;
    this.socket.emit(`startSession`, familyId);

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

  @action handleConfirmation = () => {
    this.confirmation = !this.confirmation;
  }

  @action handleFamilyMemberRemove = id => {
    removeFamilyMembers({id: id})
    .catch(err => {
      this.handleError(err);
    });

    this.activeFamily.familymembers = filter(this.activeFamily.familymembers, familymember => {
      return familymember._id !== id;
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

}

export default new Families();
