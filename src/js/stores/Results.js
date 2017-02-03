import {observable, action} from 'mobx';

import {selectByFamilyModelId} from '../api/results';

class Results  {

  @observable activeResult = [];

  @action handleNoteRemove = id => {
    console.log(`remove results`);
    console.log(id);
  }

  @action getResult = familyModelId => {
    selectByFamilyModelId({familyModelId: familyModelId})
    .then(results => {
      this.activeResult = results.result;
    }).catch(err => {
      this.handleError(err);
    });
  }


}

export default new Results();
