import {observable, action} from 'mobx';
import {find, kebabCase, uniq} from 'lodash';
import io from 'socket.io-client';

import {select} from '../api/models';
import {selectByFamily} from '../api/familymodels';
import Users from './Users';
import Families from './Families';
import Languages from './Languages';
import {token} from '../auth';

class Models  {

  socket = io(`/`);
  @observable isLoading = true;
  @observable allModels = [];
  @observable passedModels = [];
  @observable modelPreview = {};
  @observable showGrid = false;

  /* distance */
  @observable isLoadingDistance = true;
  @observable onboarding = true;
  @observable draggableCharacters = [];
  @observable familyLanguages = [];
  @observable currentLanguage = 0;
  @observable currentResult = [{}];

  @action getModels = () => {
    this.isLoading = true;

    select()
    .then(models => {
      this.allModels = models.models;
      this.handlePassedModels();
      this.modelPreview = this.allModels[Math.round((this.allModels.length - 1) / 2)];

      this.isLoading = false;
    }).catch(err => {
      this.handleError(err);
    });
  }

  @action getModel = id => {

    this.isLoading = true;

    select(id)
    .then(models => {
      Users.currentModelId = models.model[0]._id;
      Families.activeFamilyModel.name = kebabCase(models.model[0].name);
      this.isLoading = false;
    }).catch(err => {
      this.handleError(err);
    });
  }

  @action handleModelPreview = id => {
    this.modelPreview = {};
    this.modelPreview = find(this.allModels, o => {
      return o._id === id;
    });
  }

  handlePassedModels = () => {

    this.isLoading = true;

    selectByFamily({familyId: Families.activeFamily._id})
      .then(familymodels => {
        familymodels.familyModels.forEach(familymodel => {

          this.allModels.forEach(model => {
            if (model._id === familymodel.modelId) this.passedModels.push(model);
          });

        });
        this.isLoading = false;
      }).catch(err => {
        this.handleError(err);
      });

  }

  @action handleIsPassed = id => {
    const model = find(this.passedModels, model => {
      return model._id === id;
    });

    if (model) return true;
    return false;
  }

  @action handleCleanModel = () => {
    Users.currentModelId = ``;
    Families.activeFamilyModel.name = ``;
  }

  handleError = error => {
    this.error = error;
  }

  @action handleShowGrid = () => {
    this.showGrid = !this.showGrid;
  }

  /* ModelDistance */
  @action getFamiliesLanguages = () => {

    this.isLoadingDistance = true;

    const familyLanguages = [];
    Families.activeFamily.familymembers.forEach(familymember => {
      familymember.languages.forEach(language => familyLanguages.push(language));
    });

    this.familyLanguages = uniq(familyLanguages);

    if (token.content().scope === `family`) Languages.handleFamilyLanguages(this.familyLanguages);

    this.isLoadingDistance = false;

  }

  @action getDraggableCharacters = () => {

    this.isLoadingDistance = true;

    Families.activeFamily.familymembers.forEach(familymember => {
      const character = {};
      character._id = familymember._id;
      character.name = familymember.character;
      character.firstname = familymember.firstName;
      character.left = 0;

      if (character.name === `chris`) {
        character.width = 20;
      } else if (character.name === `gigi`) {
        character.width = 14;
      } else {
        character.width = 7;
      }

      this.draggableCharacters.push(character);
    });

    this.isLoadingDistance = false;

  }

  @action handleMoveCharacter = (id, e) => {
    e.preventDefault();
    const xPos = e.touches[0].clientX;

    this.draggableCharacters.forEach(character => {
      if (character._id === id) {
        let left = ((xPos / 10) - (character.width / 2));
        if (left > 75) left = 75;
        if (left < 0) left = 0;
        character.left = left;
      }
    });
  }

  @action handleDragCharacter = (id, e) => {
    e.preventDefault();
    e.persist();

    /*const dragImgEl = document.createElement(`span`);
    dragImgEl.setAttribute(`style`, `position: absolute; display: block; top: 0; left: 0; width: 0; height: 0;`);
    document.body.appendChild(dragImgEl);
    e.dataTransfer.setDragImage(dragImgEl, 0, 0);*/
    /*e.dataTransfer.setDragImage(0, 0, 0);*/
    const xPos = e.clientX;

    this.draggableCharacters.forEach(character => {
      if (character._id === id) {
        if (xPos !== 0) {
          let left = ((xPos / 10) - (character.width / 2));
          if (left > 75) left = 75;
          if (left < 0) left = 0;
          character.left = left;
        }
      }
    });
  }

  @action handleEndMoveCharacter = e => {
    e.preventDefault();
    this.socket.emit(`handleModel`, token.content().sub, `family`, this.draggableCharacters);
  }

  @action handleNextLanguage = i => {

    this.handleCurrentResult(this.currentLanguage);
    this.currentLanguage = i;
    this.handleResetCharacters(i);

    this.socket.emit(`handleCurrentLanguage`, Users.currentSocketId, this.currentLanguage);
  }

  handleCurrentResult = i => {
    /* save the old results */

    const result = find(this.currentResult, result => {
      return result.language === this.familyLanguages[i];
    });

    if (result) { //update
      this.currentResult.forEach(result => {
        if (result.language === this.familyLanguages[i]) {
          result.results = this.draggableCharacters;
        }
      });
    } else { //add
      const result = {
        model: Users.currentModelId,
        language: this.familyLanguages[this.currentLanguage],
        results: this.draggableCharacters
      };
      this.currentResult.push(result);
    }

  }

  handleResetCharacters = i => {

    const result = find(this.currentResult, result => {
      return result.language === this.familyLanguages[i];
    });

    if (result) {
      console.log(`language in results`);
      this.draggableCharacters = result.results;
    } else {
      console.log(`language not in results`);
      console.log(this.draggableCharacters);
      this.draggableCharacters.forEach(character => {
        character.left = 0;
      });
    }

    this.socket.emit(`handleModelLanguage`, Users.currentSocketId, this.draggableCharacters);
  }

  @action handleIsPassedLanguage = language => {

    let passed = false;
    this.currentResult.forEach(result => {
      if (result.language === language) passed = true;
    });
    return passed;
  }

  @action handleOnboarding = () => {
    this.onboarding = !this.onboarding;

    if (token.content().scope === `professional`) {
      this.socket.emit(`handleOnboarding`, Users.currentSocketId, `professional`, this.onboarding);
      this.socket.emit(`handleModel`, Users.currentSocketId, `professional`, this.draggableCharacters);
    } else {
      this.socket.emit(`handleOnboarding`, token.content().sub, `family`, this.onboarding);
      this.socket.emit(`handleModel`, token.content().sub, `family`, this.draggableCharacters);
    }

  }


}

export default new Models();
