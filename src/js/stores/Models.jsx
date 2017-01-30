import {observable, action} from 'mobx';
import {filter} from 'lodash';

import {select} from '../api/models';

class Models  {

  @observable isLoading = true;
  @observable allModels = [];
  @observable modelPreview = {};
  @observable showGrid = false;

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

  @action handleModelPreview = id => {
    this.modelPreview = {};
    this.modelPreview = filter(this.allModels, o => {
      return o._id === id;
    })[0];
  }

  handlePassedModels = () => {
    this.allModels.forEach(model => {
      model.passed = false;
    });
  }

  @action handleShowGrid = () => {
    console.log(`show grid`);
    this.showGrid = !this.showGrid;
  }

}

export default new Models();
