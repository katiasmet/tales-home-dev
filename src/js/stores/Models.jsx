import {observable, action} from 'mobx';
import {filter} from 'lodash';

import {select} from '../api/models';
import {selectByFamily} from '../api/familymodels';
import families from './Families';

class Models  {

  @observable isLoading = true;
  @observable allModels = [];
  @observable passedModels = [];
  @observable modelPreview = {};
  @observable showGrid = false;

  @action getModels = () => {
    this.isLoading = true;

    select()
    .then(models => {
      this.allModels = models.models;
      this.handlePassedModels();
      this.modelPreview = this.allModels[Math.round((this.allModels.length - 1) / 2)];
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

    const model = filter(this.passedModels, model => {return model._id === id;})[0];

    if (model) return true;
    return false;
  }

  handleError = error => {
    this.error = error;
  }

  @action handleShowGrid = () => {
    this.showGrid = !this.showGrid;
  }

}

export default new Models();
