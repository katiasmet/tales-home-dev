import {observable, action} from 'mobx';
import {filter, isEmpty} from 'lodash';
import io from 'socket.io-client';

import {selectByProfessional, insert, update} from '../api/notes';
import {token} from '../auth';
import families from './Families';
import results from './Results';
import users from './Users';

class Notes  {

  socket = io(`/`);
  @observable allNotes = [];
  @observable notesInput = ``;
  @observable redirect = false;
  @observable error = ``;
  @observable isLoadingNotes = false;
  @observable activeNote = ``;
  @observable showNotes = true;

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

    if (this.allNotes.length > 0) {
      const note = filter(this.allNotes, note => {
        return note.familyModelId === families.activeFamilyModel._id;
      })[0][0];

      if (note) {
        this.activeNote = note._id;
        this.notesInput = note.notes;
      }
    }

    this.isLoadingNotes = false;

  }

  @action handleNotes = e => {
    this.notesInput = e.target.value;
  }

  @action handleSubmit = e => {

    e.preventDefault();

    results.handleSubmit();
    if (isEmpty(this.activeNote)) {
      insert({familyModelId: families.activeFamilyModel._id, notes: this.notesInput})
        .then(() => {
          this.redirect = true;
        })
        .catch(error => {
          this.handleError(error.message);
        });
    } else {

      update({notes: this.notesInput}, this.activeNote)
        .then(() => {
          this.redirect = true;
        })
        .catch(error => {
          this.handleError(error.message);
        });
    }

    this.socket.emit(`stopModel`, users.currentSocketId);

  }

  @action handleRedirect = () => {
    if (this.redirect) this.redirect = false;
  }

  @action handleError = error => {
    this.error = error;
  }

  @action handleCloseNotes = () => {
    this.showNotes = false;
  }

  @action handleOpenNotes = () => {
    this.showNotes = true;
  }

}

export default new Notes();
