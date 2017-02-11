import {observable, action} from 'mobx';
import {filter, kebabCase, uniq} from 'lodash';
import io from 'socket.io-client';

import {select} from '../api/models';
import {selectByFamily} from '../api/familymodels';
import users from './Users';
import families from './Families';
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

    select(id)
    .then(models => {
      users.currentModelId = models.model[0]._id;
      families.activeFamilyModel.name = kebabCase(models.model[0].name);
      this.isLoading = false;
    }).catch(err => {
      this.handleError(err);
    });
  }

  @action handleModelPreview = id => {
    this.modelPreview = {};
    this.modelPreview = filter(this.allModels, o => {
      return o._id === id;
    })[0];
  }

  handlePassedModels = () => {

    this.isLoading = true;

    selectByFamily({familyId: families.activeFamily._id})
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
    const model = filter(this.passedModels, model => {
      return model._id === id;
    })[0];

    if (model) return true;
    return false;
  }

  @action handleCleanModel = () => {
    users.currentModelId = ``;
    families.activeFamilyModel.name = ``;
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
    families.activeFamily.familymembers.forEach(familymember => {
      familymember.languages.forEach(language => familyLanguages.push(language));
    });

    this.familyLanguages = uniq(familyLanguages);

    this.isLoadingDistance = false;

  }

  @action handleNextLanguage = () => {
    this.currentLanguage++;
  }

  @action getDraggableCharacters = () => {

    this.isLoadingDistance = true;

    families.activeFamily.familymembers.forEach(familymember => {
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
    console.log(e);


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
    this.socket.emit(`handleModel`, token.content().sub, this.draggableCharacters);
  }

  @action handleNextLanguage = i => {
    this.handleCurrentResult();
    this.handleResetCharacters();

    this.currentLanguage = i;
  }

  handleCurrentResult = () => {
    const result = {
      model: users.currentModelId,
      language: this.familyLanguages[this.currentLanguage],
      results: this.draggableCharacters
    };
    this.currentResult.push(result);
  }

  handleResetCharacters = () => {
    this.draggableCharacters.forEach(character => {
      character.left = 0;
    });
  }

  @action handleIsPassedLanguage = language => {
    console.log(`handle passed language`);
    console.log(language);

    this.currentResult.forEach(result => {
      console.log(result.language);
      if (result.language === language) return true;
    });
    return false;
  }


}

export default new Models();
