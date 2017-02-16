import {observable, action} from 'mobx';
import io from 'socket.io-client';
import {orderBy, filter, find, startsWith, isEmpty, toUpper, uniq, includes, toString} from 'lodash';

import {selectByProfessional, remove as removeFamily} from '../api/families';
import {selectByFamily as selectFamilyMembers, remove as removeFamilyMembers} from '../api/familymembers';
import {selectByFamily as selectFamilyModels, selectFamilyModel, insert, remove as removeFamilyModels} from '../api/familymodels';
import {select as selectModel} from '../api/models';
import {content} from '../auth/token';

import Users from './Users';
import Notes from './Notes';
import Results from './Results';
import FormAddFamily from './FormAddFamily';

class Families  {

  socket = io(`/`);

  @observable isLoading = ``;
  @observable allFamilies = [];
  error = ``;
  @observable activeFamilies = []; /* PRO - visible families in the overview */

  @observable characters = []; /* PRO - family navigation */
  @observable activeCharacter = ``;
  @observable activeFamily = { /* PRO AND FAMILY */
    _id: ``,
    name: ``,
    origins: ``,
    homeLocation: ``,
    overviewVisites: 0,
    familymembers: {},
    familymodels: {}
  };

  @observable activeFamilyModel = {
    _id: ``,
    name: ``
  }

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
        return true;
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

    if (isEmpty(this.showInfo)) {

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
              this.activeFamily.familymodels[i].name = model.model[0].name;
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

    /* fetch notes and results already */
    if (isEmpty(Notes.allNotes)) Notes.getNotes();
    if (isEmpty(Results.allResults)) Results.getResults();
  }

  findActiveFamily = id => {

    this.activeFamily = find(this.allFamilies, family => {
      return family._id === id;
    });

  };

  @action handleActiveFamilyMember = id => {
    this.showInfo = id;
  }

  @action handleFamilySession = familyId => {

    this.isLoading = `session`;

    this.generateSessionId();
    this.handleFamilyInfo(familyId, false);

    this.socket.emit(`setSession`, Users.currentSocketId, familyId, this.sessionId);

  }

  generateSessionId = () => {

    const sessionId = toString(Math.floor(1000 + Math.random() * 9000));

    if (this.checkInUse(sessionId)) this.sessionId = sessionId;
    else this.generateSessionId();

  }

  checkInUse = sessionId => {
    const used = filter(Users.allUsers, user => {
      return user.sessionId === sessionId;
    });

    if (used.length === 0) return true;
    else return false;
  }

  @action handleFamilyMembersVisites = () => {
    this.activeFamily.overviewVisites++;
  }

  @action handleStartSession = () => {

    const familyId = content().sub;
    this.socket.emit(`startSession`, familyId);

  }

  @action handleCloseSession = () => { //happens when you close the session popup
    this.sessionId = ``;
    FormAddFamily.startSession = ``;
    this.socket.emit(`stopSession`, Users.currentSocketId);
  }

  @action handleStopSession = () => { //happens when session is already started

    this.socket.emit(`stopSession`, Users.currentSocketId);
    window.location.href = `/`;

  }

  @action handleStartModel = id => {

    this.isLoading = `model`;
    this.socket.emit(`setModel`, Users.currentSocketId, id);

    //get familymodelid else insert
    selectFamilyModel({familyId: this.activeFamily._id, modelId: id})
      .then(familymodel => {

        if (familymodel.familyModel.length !== 0) {
          this.activeFamilyModel._id = familymodel.familyModel[0]._id;
          this.isLoading = ``;

          Notes.getNote();
          Results.getResult();

        } else {

          insert({familyId: this.activeFamily._id, modelId: id})
            .then(familymodel => {
              this.activeFamilyModel._id = familymodel._id;

              Notes.getNote();
              Results.getResult();

              this.isLoading = ``;

              this.activeFamily.familymodels.push(familymodel.FamilyModel[0]);

            })
            .catch(err => {
              this.handleError(err);
            });
        }
      })
      .catch(err => {
        this.handleError(err);
      });
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

  @action handleConfirmation = id => {
    if (isEmpty(this.confirmation)) this.confirmation = id;
    else this.confirmation = ``;
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
