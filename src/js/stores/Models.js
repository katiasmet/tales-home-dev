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
  @observable onboardingTimer = 5;
  @observable draggableCharacters = [];
  @observable familyLanguages = [];
  @observable currentLanguage = 0;
  @observable currentResult = [];

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

    if (token.content().scope === `professional`) {
      const model = find(this.allModels, model => {
        model._id === id;
      });

      Users.currentModelId = model._id;
      Families.activeFamilyModel.name = kebabCase(model.name);
      this.isLoading = false;

    } else {

      select(id)
      .then(models => {
        Users.currentModelId = models.model[0]._id;
        Families.activeFamilyModel.name = kebabCase(models.model[0].name);
        this.isLoading = false;
      }).catch(err => {
        this.handleError(err);
      });

    }

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
        character.width = 180; /* in px */
      } else if (character.name === `gigi`) {
        character.width = 140;
      } else {
        character.width = 65;
      }

      this.draggableCharacters.push(character);
    });

    this.isLoadingDistance = false;

  }

  @action handleMoveCharacter = (id, e) => {
    e.preventDefault();

    /* left is a relative number (%) to the window size of the user */
    const scene = document.querySelector(`.model-distance`);
    const clientWidth = scene.clientWidth;
    const xPos = e.touches[0].clientX;

    this.draggableCharacters.forEach(character => {
      if (character._id === id) {
        let left = (((xPos - (character.width / 2)) / clientWidth) * 100);
        console.log(left);
        if (left > 100) left = 100;
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
    const scene = document.querySelector(`.model-distance`);
    const clientWidth = scene.clientWidth;
    const xPos = e.clientX;

    this.draggableCharacters.forEach(character => {
      if (character._id === id) {
        if (xPos !== 0) {
          let left = (((xPos - (character.width / 2)) / clientWidth) * 100);
          if (left > 99) left = 99;
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

  handleOnboarding = () => {
    this.onboarding = false;

    if (token.content().scope === `professional`) {
      this.socket.emit(`handleOnboarding`, Users.currentSocketId, `professional`, this.onboarding, this.draggableCharacters);
    } else {
      this.socket.emit(`handleOnboarding`, token.content().sub, `family`, this.onboarding, this.draggableCharacters);
    }

  }

  @action handleOnboardingTimer = () => {
    this.timer = window.setInterval(this.handleCount, 1500);
  }

  handleCount = () => {
    this.onboardingTimer--;

    if (this.onboardingTimer === 0) {
      /*this.handleOnboarding();*/
      clearInterval(this.timer);
    }
  }


}

export default new Models();
