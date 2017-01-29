import {observable, action} from 'mobx';

import {selectByFamilyModelId} from '../api/notes';

class Results  {

  @observable activeResult = [];

  @action handleNoteRemove = id => {
    console.log(`remove results`);
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
