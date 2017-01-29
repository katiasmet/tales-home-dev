import {observable, action} from 'mobx';

import {selectByFamilyModelId} from '../api/notes';

class Notes  {

  @observable activeNote = [];

  @action handleNoteRemove = id => {
    console.log(`remove notes`);
  }

  @action getNote = familyModelId => {
    selectByFamilyModelId({familyModelId: familyModelId})
    .then(notes => {
      this.activeNote = notes.note;
    }).catch(err => {
      this.handleError(err);
    });
  }

}

export default new Notes();
