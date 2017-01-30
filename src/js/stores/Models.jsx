import {observable, action} from 'mobx';

import {select} from '../api/models';

class Models  {

  @observable isLoading = true;
  @observable models = [];
  @observable activeModel = [];

  @action getModels = () => {
    this.isLoading = true;

    select()
    .then(models => {
      this.models = models.models;
      this.isLoading = false;
    }).catch(err => {
      this.handleError(err);
    });
  }

}

export default new Models();
