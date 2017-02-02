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

    console.log(`get note`);

    selectByFamilyModelId({familyModelId: familyModelId})
    .then(notes => {
      this.activeNote = notes.note;
    }).catch(err => {
      this.handleError(err);
    });
  }

  @action handleNotes = (field, value) => {
    this.notesInput = value;
  }

  @action handleSubmit = () => {

  }

}

export default new Notes();
