import {observable, action} from 'mobx';
import {filter} from 'lodash';
import io from 'socket.io-client';

import {selectByProfessional, insert} from '../api/notes';
import {token} from '../auth';
import families from './Families';
import users from './Users';

class Notes  {

  socket = io(`/`);
  @observable allNotes = [];
  @observable activeNote = [];
  @observable notesInput = ``;
  @observable redirect = false;
  @observable error = ``;
  @observable isLoadingNotes = false;

  @action handleNoteRemove = id => {
    console.log(`remove notes`);
    console.log(id);
  }

  @action getNotes = () => {
    this.isLoadingNotes = true;
    selectByProfessional({professionalId: token.content().sub})
      .then(notes => {
        this.allNotes = notes;
        this.isLoadingNotes = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  @action getNote = () => {

    this.isLoadingNotes = true;

    /*selectByFamilyModelId({familyModelId: families.activeFamilyModel._id})
    .then(notes => {
      this.activeNote = notes.note;
      this.isLoadingNotes = false;
    }).catch(err => {
      this.handleError(err);
    });*/

    this.activeNote = filter(this.allNotes, note => {
      return note.familyModelId === families.activeFamilyModel._id;
    })[0];

    this.isLoadingNotes = false;

  }

  @action handleNotes = e => {
    this.notesInput = e.target.value;
  }

  @action handleSubmit = e => {

    e.preventDefault();

    insert({familyModelId: families.activeFamilyModel._id, notes: this.notesInput})
      .then(() => {
        this.redirect = true;
      })
      .catch(error => {
        this.handleError(error.message);
      });

    this.socket.emit(`stopModel`, users.currentSocketId);

  }

  @action handleError = error => {
    this.error = error;
  }

}

export default new Notes();
