import {observable, action} from 'mobx';

import {selectByFamilyModelId} from '../api/notes';

class Notes  {

  @observable activeNote = [];
  @observable notesInput = ``;

  @action handleNoteRemove = id => {
    console.log(`remove notes`);
    console.log(id);
  }

  @action getNote = familyModelId => {

    //family id uit localstorage ?
    //model door klik

    selectByFamilyModelId({familyModelId: familyModelId})
    .then(notes => {
      this.activeNote = notes.note;
    }).catch(err => {
      this.handleError(err);
    });
  }

  @action handleNotes = (field, value) => {
    console.log(value);
    //opslaan bij stop session ?
  }

}

export default new Notes();
